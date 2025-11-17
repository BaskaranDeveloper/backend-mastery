const { log } = require("console");
const fs = require("fs");
const { Transform } = require("stream");


// create a function

const upperCase = new Transform({
    transform(chunk, encoding, callback) {
        const output = chunk.toString().toUpperCase();
        callback(null, output);
    },
});

// read
fs.createReadStream("input.txt").pipe(upperCase).pipe(fs.createWriteStream("uppercase_output.txt")).on("finish", () => console.log("Upper case transform completed!"));