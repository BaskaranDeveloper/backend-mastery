const http = require("http");

class TinyExpress {
    constructor() {
        this.middlewares = [];
    }

    use(fn) {
        this.middlewares.push(fn);
    }

    handleRequest(req, res) {
        let index = 0;

        const next = () => {
            if (index < this.middlewares.length) {
                const middleware = this.middlewares[index];
                index++;
                middleware(req, res, next);
            }
        };

        next();
    }

    listen(port, callback) {
        const server = http.createServer((req, res) => {
            this.handleRequest(req, res);
        });
        server.listen(port, callback);
    }
}

module.exports = TinyExpress;
