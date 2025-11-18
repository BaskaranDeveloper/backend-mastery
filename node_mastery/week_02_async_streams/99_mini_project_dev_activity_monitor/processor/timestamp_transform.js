const { Transform } = require("stream");


module.exports = new Transform({
    transform(chunk, encoding, callback) {
        // store a values
        const out = chunk.toString().split("\n").map(line => `[${new Date.toISOString()}] ${line}`).join("\n");

        callback(null, out);
    }

})