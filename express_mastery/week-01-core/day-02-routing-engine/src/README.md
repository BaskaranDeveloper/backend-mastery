# Day 02 — TinyExpress Routing Engine (Express Router Internals)

🎯 Objective

Implement the internal routing mechanism of Express.js:

✔️ Register routes (GET, POST)
✔️ Match incoming requests
✔️ Execute the correct handler
✔️ Integrate with middleware chain
✔️ Return 404 for unknown routes

This builds the same internal system used by Express Router, NestJS routing, and all major backend frameworks.

🧠 1. What We Built Today

We extended our TinyExpress framework by adding:

🔹 Route storage system
this.routes = [];

🔹 Route registration (get(), post())
app.get("/users", handler)
app.post("/login", handler)

🔹 Route matching logic

Checks:

HTTP method

Request path

🔹 Controller execution

Runs the matching handler function.

🔹 404 response

If no route matches, return:

404 Not Found

🧩 2. Why Routing Matters (Simple Explanation)

Every backend framework — Express, NestJS, Fastify, Adonis —
must answer one question:

“Which controller should handle this request?”

Example request:

GET /users

Routing engine decides:

1️⃣ Find method: GET
2️⃣ Find path: /users
3️⃣ Run that handler

This is the heart of every API.

You built that today.

🧱 3. Folder Structure
day-02-routing-engine/
│
├── src/
│ ├── tinyExpress.js # Routing engine implementation
│ └── test.js # Route testing server
│
└── README.md # Documentation

⚙️ 4. TinyExpress Routing Engine (Code)
tinyExpress.js
const http = require("http");

class TinyExpress {
constructor() {
this.middlewares = [];
this.routes = [];
}

    use(fn) {
        this.middlewares.push(fn);
    }

    get(path, handler) {
        this.routes.push({ method: "GET", path, handler });
    }

    post(path, handler) {
        this.routes.push({ method: "POST", path, handler });
    }

    matchRoute(method, url) {
        return this.routes.find(
            (route) => route.method === method && route.path === url
        );
    }

    handleRequest(req, res) {
        let index = 0;

        const next = () => {
            if (index < this.middlewares.length) {
                const middleware = this.middlewares[index];
                index++;
                middleware(req, res, next);
            } else {
                const route = this.matchRoute(req.method, req.url);

                if (route) return route.handler(req, res);

                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("404 Not Found");
            }
        };

        next();  // Start pipeline
    }

    listen(port, callback) {
        const server = http.createServer((req, res) => {
            this.handleRequest(req, res);
        });

        server.listen(port, callback);
    }

}

module.exports = TinyExpress;

🧪 5. Testing Routes (test.js)
const TinyExpress = require("./tinyExpress");
const app = new TinyExpress();

app.use((req, res, next) => {
console.log("Incoming Request →", req.method, req.url);
next();
});

app.get("/", (req, res) => {
res.end("Welcome to TinyExpress Routing Engine!");
});

app.get("/users", (req, res) => {
res.end("Users List");
});

app.post("/login", (req, res) => {
res.end("Login Success");
});

app.listen(3000, () => console.log("Routing Engine running on 3000"));

🚀 6. What You Learned Today
✔️ How Express stores routes internally
✔️ How .get() and .post() actually work
✔️ How request matching works
✔️ How controllers are executed
✔️ How Express handles unknown routes
✔️ Difference between middleware and routing layers
🔥 7. Real-World Advantages

You can now:

Debug Express routing issues

Understand why order of routes matters

Understand route-level middleware

Design your own custom routing logic

Understand frameworks like NestJS better

Build routers for microservices

This is real backend engineering.
