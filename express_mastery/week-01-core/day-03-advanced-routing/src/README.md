# DAY 03 – Advanced Routing + TinyRouter (Express.Router Clone)

🚀 Overview

In Day 03, we implemented a full routing engine plus a Router system similar to express.Router.
This upgrade transforms TinyExpress into a modular, production-style framework.

You built:

Dynamic routes (/users/:id)

Multi-parameter routes

Regex-based matching

URL normalization

Router-level middleware

Router mounting (app.use("/auth", router))

Route grouping inside TinyRouter

🌐 Features Implemented
1️⃣ Dynamic Route Matching

We support routes like:

app.get("/users/:id", handler);
app.get("/posts/:pid/comments/:cid", handler);

The engine converts:

/users/:id → /^\/users\/([^/]+)$/

And exposes params as:

req.params.id;

2️⃣ URL Normalization

Before matching:

Removes trailing slash: /users/10/ → /users/10

Removes query strings: /users/10?a=1 → /users/10

Ensures consistent matching.

3️⃣ TinyRouter (Express.Router clone)

We created a reusable router:

const router = new TinyRouter();

router.get("/login", ...);
router.get("/register", ...);

app.use("/auth", router); // Mount at /auth

Final routes become:

/auth/login
/auth/register

4️⃣ Router-Level Middleware

Router-specific middleware:

router.use((req, res, next) => { ... });

Executed only for /auth/\* routes.

5️⃣ Route Prefix Mounting

app.use("/auth", router) expands all router paths:

Router path Mounted path
/login /auth/login
/register /auth/register

Exactly how Express works.

📂 Project Structure
day-03-advanced-routing/
│── src/
│ ├── tinyExpress.js # Main framework engine
│ ├── tinyRouter.js # Router implementation
│ ├── utils.js # Dynamic route → regex converter
│ ├── test.js # Dynamic route testing
│ └── test-router.js # Router mounting tests
│── README.md

🧠 Key Concepts Learned
✔ Route Regex Conversion

You wrote the same logic Express uses internally before switching to path-to-regexp.

✔ Middleware Pipeline

(req, res, next) pipeline extended to include router-level middleware.

✔ Mounting Strategy

Router routes merged into app with prefix handling.

✔ Clean Modularity

You now understand how Express handles:

Modular route files

Grouped routes

Prefixed routers

Router-level middleware

🧪 Test Endpoints
Login route
GET /auth/login
→ Router middleware
→ "Login Page"

Register route
GET /auth/register
→ Router middleware
→ "Register Page"

Wrong route
GET /auth/unknown
→ 404 Not Found

Home Route
GET /
→ "Home Page"
