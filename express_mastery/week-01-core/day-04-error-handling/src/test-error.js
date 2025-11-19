const TinyExpress = require("./tinyExpress");
const { asyncHandler } = require("./utils");

const app = new TinyExpress();

// 1. Normal middleware
app.use((req, res, next) => {
    console.log("Normal middleware");
    next();
});

// 2. Route that throws sync error
app.get("/sync-error", (req, res) => {
    throw new Error("Sync Route Error");
});

// 3. Route that throws async error
app.get("/async-error", asyncHandler(async (req, res) => {
    throw new Error("Async Route Error");
}));

// 4. Custom error middleware
app.use((err, req, res, next) => {
    console.log("Error Middleware Hit:", err.message);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Custom Error: " + err.message);
});

app.listen(3000, () => {
    console.log("Day 04 Error Test running on 3000");
});
