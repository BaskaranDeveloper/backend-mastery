const TinyExpress = require("./tinyExpress");
const TinyRouter = require("./tinyRouter");

const app = new TinyExpress();
const router = new TinyRouter();

// Router middleware

router.use((req, res, next) => {
    console.log("Router Middleware -> /auth/* only");
    next();

});

// Router routes
router.get("/login", (req, res) => {
    res.end("Login Page");
});

router.get("/register", (req, res) => {
    res.end("Register Page");
});

app.use("/auth", router);

// Root route
app.get("/", (req, res) => {
    res.end("Home Page");
});

const port = 3000;

app.listen(port, () => {
    console.log(`Router Test running on http://localhost:${port}`);

})
