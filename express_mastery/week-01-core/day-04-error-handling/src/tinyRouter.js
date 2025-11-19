const { createRouteRegex } = require("./utils");

class TinyRouter {
    constructor() {
        this.middleware = [];
        this.routes = [];
    }

    // register middleware
    use(fn) {
        this.middleware.push(fn);
    }

    // router register
    register(method, path, handler) {
        const { regex, paramNames } = createRouteRegex(path);

        this.routes.push({
            method,
            path,
            handler,
            regex,
            paramNames
        });
    }

    // register get
    get(path, handler) {
        this.register("GET", path, handler);
    }

    // register post
    post(path, handler) {
        this.register("POST", path, handler)
    }
}
module.exports = TinyRouter;