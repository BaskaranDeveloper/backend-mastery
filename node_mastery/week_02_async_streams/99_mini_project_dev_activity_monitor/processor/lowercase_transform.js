const { Transform } = require("stream");

module.exports = new Transform({
    transform(chunk, enc, cb) {
        cb(null, chunk.toString().toLowerCase());
    }
});
