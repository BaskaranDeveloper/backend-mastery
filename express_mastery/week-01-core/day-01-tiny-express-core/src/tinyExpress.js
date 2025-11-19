const http = require("http");

class TinyExpress {
    constructor() {
        this.middlewares = [];
    }

    // register middleware
    use(fn) {
        this.middlewares.push(fn);
        console.log("Middleware registered:", this.middlewares.length);
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

        next(); // start running the pipeline
    }

    listen(port, callback) {
        const server = http.createServer((req, res) => {
            this.handleRequest(req, res);
        });

        server.listen(port, callback);
    }
}

module.exports = TinyExpress;
