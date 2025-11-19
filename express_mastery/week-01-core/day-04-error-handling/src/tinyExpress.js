const http = require("http");
const { createRouteRegex, asyncHandler } = require("./utils");
const TinyRouter = require("./tinyRouter");

class TinyExpress {
    constructor() {
        this.middlewares = [];
        this.errorMiddlewares = [];
        this.routes = [];
    }


    // app.use()

    use(pathOrFn, maybeRouter) {
        // Case 1: app.use(fn) - middleware
        if (typeof pathOrFn === "function") {
            const fn = pathOrFn;

            // Error middleware (err, req, res, next)
            if (fn.length === 4) {
                this.errorMiddlewares.push(fn);
            } else {
                this.middlewares.push(fn);
            }
            return;
        }

        // Case 2: app.use("/auth", router)
        if (typeof pathOrFn === "string" && maybeRouter instanceof TinyRouter) {
            const basePath = pathOrFn;
            const router = maybeRouter;

            // Merge router routes → app routes
            for (const route of router.routes) {
                const fullPath = basePath + route.path;
                const { regex, paramNames } = createRouteRegex(fullPath);

                this.routes.push({
                    method: route.method,
                    path: fullPath,
                    handler: route.handler,
                    regex,
                    paramNames
                });
            }

            // Router-level middleware
            for (const mw of router.middlewares) {
                this.middlewares.push((req, res, next) => {
                    if (req.url.startsWith(basePath)) {
                        return mw(req, res, next);
                    }
                    next();
                });
            }

            return;
        }
    }


    // Route registration

    register(method, path, handler) {
        const { regex, paramNames } = createRouteRegex(path);

        this.routes.push({ method, path, handler, regex, paramNames });
    }

    get(path, handler) {
        this.register("GET", path, handler);
    }

    post(path, handler) {
        this.register("POST", path, handler);
    }


    // Route matching

    matchRoute(method, url) {
        for (const route of this.routes) {
            if (route.method !== method) continue;

            const match = route.regex.exec(url);
            if (match) {
                const params = {};
                route.paramNames.forEach((name, i) => {
                    params[name] = match[i + 1];
                });

                return { route, params };
            }
        }
        return null;
    }
    // Error Pipeline

    runErrorPipeline(err, req, res) {
        let idx = 0;
        const nextError = (newErr) => {
            const error = newErr || err;
            if (idx < this.errorMiddlewares.length) {
                const handler = this.errorMiddlewares[idx++];
                return handler(error, req, res, nextError);

            }
            // Fallback global error handler
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                status: "error",
                message: error.message || "Internel Sever Error"
            }));
        };
        nextError();
    }




    // Main request handler

    handleRequest(req, res) {
        req.url = req.url.split("?")[0];
        if (req.url.length > 1 && req.url.endsWith("/")) {
            req.url = req.url.slice(0, -1);
        }

        let index = 0;

        const next = (err) => {
            if (err) return this.runErrorPipeline(err, req, res);

            if (index < this.middlewares.length) {
                const mw = this.middlewares[index++];
                return mw(req, res, next);
            }

            const result = this.matchRoute(req.method, req.url);
            if (result) {
                req.params = result.params;

                try {
                    return result.route.handler(req, res, next);
                } catch (e) {
                    return next(e);
                }
            }

            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 Not Found");
        };

        next();
    }

    listen(port, callback) {
        const server = http.createServer((req, res) =>
            this.handleRequest(req, res)
        );
        server.listen(port, callback);
    }
}

module.exports = TinyExpress;
