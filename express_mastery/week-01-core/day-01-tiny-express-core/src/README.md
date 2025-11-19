Day 01 — TinyExpress: Building Express Core from Scratch
🎯 Objective

Understand the internal architecture of Express.js by implementing a minimal Express-like framework.
This helps build mastery over:

Middleware pipeline architecture

Request → Response lifecycle

next() execution flow

Internal working of app.use()

How Express chains middlewares

How frameworks are designed

This is foundational knowledge for Express, NestJS, and any backend framework.

🧠 1. What We Built

Today we implemented TinyExpress, a simplified version of Express.js with:

✔️ Middleware registration
✔️ Middleware execution pipeline
✔️ Custom next() mechanism
✔️ HTTP server integration
✔️ Request lifecycle simulation
✔️ Basic response handling

This helps you understand how Express internally works.

🏗️ 2. Folder Structure
day-01-tiny-express-core/
│
├── src/
│ ├── tinyExpress.js # Core framework implementation
│ └── test.js # Test server using TinyExpress
│
└── README.md # Documentation

🧩 3. Key Concepts Learned
🔸 3.1 Middleware Pipeline

Express processes every request by running a stack of middleware functions in order.

Each middleware has this signature:

(req, res, next) => {}

req = incoming request

res = response object

next() = function to call the next middleware

🔸 3.2 How Express Stores Middlewares

Inside TinyExpress, we store middleware functions in an array:

this.middlewares = [];

Each time we call:

app.use(fn)

The function is pushed into this array.

🔸 3.3 How Express Executes Middlewares

Express runs middlewares one-by-one using a pointer (index):

middleware(req, res, next)

When middleware calls next(), Express moves to the next middleware.

If next() is not called → execution stops.

This is WHY request hangs in Express when you forget next().

🔸 3.4 Request Lifecycle in Express

Your TinyExpress simulates Express’s internal flow:

Incoming Request
↓
Middleware 1
↓
Middleware 2
↓
Middleware 3 (handler)
↓
Send Response

This is how Express handles every request internally.

⚙️ 4. Implementation
🔹 TinyExpress Core (tinyExpress.js)
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

🔹 Test Server (test.js)
const TinyExpress = require("./tinyExpress");
const app = new TinyExpress();

app.use((req, res, next) => {
console.log("Middleware 1");
req.start = Date.now();
next();
});

app.use((req, res, next) => {
console.log("Middleware 2");
next();
});

app.use((req, res) => {
console.log("Middleware 3 - Sending Response");
res.writeHead(200, { "Content-Type": "application/json" });
res.end(
JSON.stringify({
ok: true,
duration: Date.now() - req.start,
})
);
});

app.listen(3000, () => console.log("TinyExpress running on port 3000"));

🔥 5. Why This Matters (Real Engineering Reasoning)

Understanding this pipeline helps you:

✔️ Debug Express apps like a senior engineer

If request hangs → middleware missing next().

✔️ Write safe, optimized middlewares

Logging, timing, validation, rate limiting, auth, upload preprocessors.

✔️ Understand NestJS deeply

NestJS is fundamentally built on Express middleware concepts.

✔️ Build scalable backend architecture

Middleware chains are the foundation of modern backend systems.

🧪 6. What You Can Build Now

With this understanding, you can build advanced middlewares:

Logger

Timer

Request validator

Auth checker

IP blocker

Role-based access

Body parser

Error handler

Rate limiter

And you know how frameworks like Express, Fastify, Koa work internally.

📚 7. Learnings Summary

Express is middleware-first

Middlewares run in a linear chain

next() decides flow control

Forgetting next() causes request hangs

Express stores middlewares in arrays

Your tinyExpress replicates Express internals

Good for debugging & architecture understanding
