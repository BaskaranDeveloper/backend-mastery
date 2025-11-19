const http = require("http");

class TinyExpress {
    // create constructor
    constructor() {
        this.middlewares = [];
        this.routes = []; //store all routes
    }

    // Register global middleware
    use(fn) {
        this.middlewares.push(fn);
    };

    // Register a GET route
    get(path, handler) {
        this.routes.push({
            method: "GET",
            path,
            handler
        });
    }

    // Register a POST route
    post(path, handler) {
        this.routes.push({
            method: "POST",
            path,
            handler
        });
    }

    // Find matching route
    matchRoute(method, url) {
        return this.routes.find((route) => route.method === method && route.path === url);
    }

    // Handle incoming request
    handleRequest(req, res) {
        let index = 0;
        const next = () => {
            if (index < this.middlewares.length) {
                const middleware = this.middlewares[index];
                index++;
                middleware(req, res, next);
            } else {
                // After middlewares → find route
                const route = this.matchRoute(req.method, req.url);
                if (route) {
                    return route.handler(req, res);
                }

                // No route found
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("404 Not found");
            }
        };
        next();
    }

    // start  the server
    listen(port, callback) {
        const server = http.createServer((req, res) => {
            this.handleRequest(req, res);
        });
        server.listen(port, callback);
    }

}

module.exports = TinyExpress;