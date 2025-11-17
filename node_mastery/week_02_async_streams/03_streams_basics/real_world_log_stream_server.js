const fs = require("fs");
const http = require("http");


// Open write stream once (append mode)
const logStream = fs.createWriteStream("server.log", { flags: "a", encoding: "utf-8" });


http.createServer((req, res) => {
    // check url
    if (req.url.startsWith("/log")) {
        const url = new URL(req.url, "http://localhost");
        const msg = url.searchParams.get("msg") || "empty";

        const line = `[${new Date().toISOString()} ${msg}\n]`;


        logStream.write(line);
        res.end("Logged successfully");
    } else {
        res.end("Hello from server!");
    }
}).listen(3000, () => console.log("Log server running on http://localhost:3000"));