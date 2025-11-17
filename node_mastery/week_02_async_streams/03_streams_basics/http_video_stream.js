const fs = require("fs");
const http = require("http");

// create a server function

http.createServer((req, res) => {
    // check video url
    if (req.url === "/video") {
        const stream = fs.createReadStream("sample.mp4");
        res.writeHead(200, { "content-type": "video/mp4" });

        stream.pipe(res);
    } else {
        res.end("Go to /video to stream file")
    }
}).listen(3000, () => console.log("video stream server running http://localhost:3000")
);

// listen server
