const TinyExpress = require("./tinyExpress");
const app = new TinyExpress();

// GLOBAL MIDDLEWARE
app.use((req, res, next) => {
    console.log("Incoming Request →", req.method, req.url);
    next();
});

// ROUTES
app.get("/", (req, res) => {
    res.end("Welcome to TinyExpress Routing Engine!");
});

app.get("/users", (req, res) => {
    res.end("Users List");
});

app.post("/login", (req, res) => {
    res.end("Login Success");
});

// START SERVER
app.listen(3000, () => console.log("Routing engine running on http://localhost:3000"));
