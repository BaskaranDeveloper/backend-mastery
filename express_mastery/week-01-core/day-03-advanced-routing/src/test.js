const TinyExpress = require("./tinyExpress");
const app = new TinyExpress();

app.use((req, res, next) => {
    console.log("Request -> ", req.method, req.url);
    next();
});

app.get("/users/:id", (req, res) => {
    res.end("User ID: " + req.params.id);
});

app.get("/posts/:postId/comments/:commentId", (req, res) => {
    res.end(JSON.stringify(req.params));
});

app.listen(3000, () => {
    console.log("Advanced Routing running on http://localhost:3000");
});
