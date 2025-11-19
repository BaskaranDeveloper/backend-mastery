const http = require("http");
const { createRouteRegex } = require("./utils");
const TinyRouter = require("./tinyRouter");

class TinyExpress {
    constructor() {
        this.middlewares = [];
        this.routes = [];
    }


    // 1. APP.USE — supports middleware and router mounting

    use(pathOrFn, maybeRouter) {
        // Case 1: app.use(middleware)
        if (typeof pathOrFn === "function") {
            this.middlewares.push(pathOrFn);
            return;
        }

        // Case 2: app.use("/auth", router)
        if (typeof pathOrFn === "string" && maybeRouter instanceof TinyRouter) {
            const basePath = pathOrFn;
            const router = maybeRouter;

            // Merge router routes into app routes
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

                console.log("REGISTERED ROUTE (router mount):", {
                    method: route.method,
                    path: fullPath,
                    regex: regex.toString(),
                    paramNames
                });
            }

            // Router-level middleware
            for (const mw of router.middleware) {
                this.middlewares.push((req, res, next) => {
                    if (req.url.startsWith(basePath)) {
                        return mw(req, res, next);
                    }
                    next();
                });
            }

            return;
        }

        throw new Error("Invalid use() call");
    }


    // 2. Register routes

    register(method, path, handler) {
        const { regex, paramNames } = createRouteRegex(path);

        this.routes.push({
            method,
            path,
            handler,
            regex,
            paramNames
        });

        console.log("REGISTERED ROUTE:", {
            method,
            path,
            regex: regex.toString(),
            paramNames
        });
    }

    get(path, handler) {
        this.register("GET", path, handler);
    }

    post(path, handler) {
        this.register("POST", path, handler);
    }


    // 3. Matching logic

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


    // 4. Main request handler

    handleRequest(req, res) {
        // Normalize URL
        req.url = req.url.split("?")[0];
        if (req.url.length > 1 && req.url.endsWith("/")) {
            req.url = req.url.slice(0, -1);
        }

        console.log("NORMALIZED URL:", req.url);

        let index = 0;

        const next = () => {
            if (index < this.middlewares.length) {
                const middleware = this.middlewares[index];
                index++;
                middleware(req, res, next);
            } else {
                const result = this.matchRoute(req.method, req.url);

                console.log("MATCH RESULT:", result);

                if (result) {
                    req.params = result.params;
                    return result.route.handler(req, res);
                }

                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("404 Not found");
            }
        };

        next();
    }


    // 5. Start server

    listen(port, callback) {
        const server = http.createServer((req, res) => {
            this.handleRequest(req, res);
        });

        server.listen(port, callback);
    }
}

module.exports = TinyExpress;
