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

})


app.use((req, res, next) => {
    console.log("Middleware 3 - Sending Response");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
        JSON.stringify({
            ok: true,
            duration: Date.now() - res.start,

        })
    )
})

app.listen(3000, () => console.log("TinyExpress running on 3000"));