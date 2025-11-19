# Day 04 — Error Handling Engine (Express-Level)

📌 Overview

In Day 04, we transformed TinyExpress into a fully capable backend framework by implementing a complete error handling system, matching the internal behavior of Express.js.

Modern backend systems MUST support reliable error propagation, structured error pipelines, async error handling, and centralized global error layers.
This upgrade brings TinyExpress to production-level architecture.

🔥 Features Implemented in Day 04
1️⃣ Error Middleware Support

Error middleware is identified by four parameters:

app.use((err, req, res, next) => {})

Express rule:

(req, res, next) → normal middleware

(err, req, res, next) → error middleware

TinyExpress now supports both.

2️⃣ next(err) Pipeline

Any middleware or route can trigger error flow:

next(new Error("Something went wrong"));

This:

Stops the normal middleware chain

Skips all route handlers

Starts the error middleware pipeline

Just like Express.

3️⃣ Global Error Pipeline

TinyExpress now includes:

Error middleware chain

Fallback global error handler

JSON structured error response

Default fallback:

{
"status": "error",
"message": "Internal Server Error"
}

4️⃣ Async Error Support (asyncHandler)

Express does NOT catch async errors by default.
We added:

asyncHandler(fn)

Which wraps any async route:

app.get("/test", asyncHandler(async (req, res) => {
throw new Error("Async fail");
}));

Ensures errors bubble to error middleware via next(err).

5️⃣ URL Normalization + Safety

Still preserves Day 03 features:

Trailing slash removal

Query stripping

Safe error propagation in route handlers

Prevents server crash on uncaught exceptions

🏗 TinyExpress Error Architecture
NORMAL PIPELINE
(req → mw1 → mw2 → route → res)
│
└── next(err)
│
ERROR PIPELINE errMw1 → errMw2 → default

📂 Folder Structure
day-04-error-handling/
│── src/
│ ├── tinyExpress.js
│ ├── utils.js
│ └── test-error.js
└── README.md

🧪 Test Scenarios
✔ Sync Error

GET /sync-error
Throws instantly → reaches error middleware.

✔ Async Error

GET /async-error
Error caught via asyncHandler → forwarded to next(err).

✔ No Custom Error Middleware

Default 500 JSON response sent.

🎉 Completion

You now have:

Full Express-style Error Engine

Middleware pipeline

Error pipeline

Async-safe routing

Global fallback handler

Your TinyExpress is now a legitimate mini backend framework.

📌 Day 04 Skills Learned
✔ Express Internals
✔ Pipeline Architecture
✔ Error-first design pattern
✔ Async error bubbling
✔ Production-safe error structures
✔ Middleware classification
✔ Robust route handling
