const { Transform } = require("stream");

module.exports = new Transform({
    transform(chunk, enc, cb) {
        const data = chunk
            .toString()
            .split("\n")
            .filter(line => line.trim() !== "")
            .join("\n");

        cb(null, data);
    }
});
