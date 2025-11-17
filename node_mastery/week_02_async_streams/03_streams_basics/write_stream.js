const fs = require("fs");

// create write stream

const writeStream = fs.createWriteStream('out.txt', { encoding: 'utf-8' });

// now write
writeStream.write("Hello Node.JS\n");
writeStream.write("This is written using stream\n");
// end the writing
writeStream.end("Done writing");

// check write data
const readFile = fs.createReadStream("out.txt", { encoding: 'utf-8', highWaterMark: 16 * 1024 });


// log 
writeStream.on("finish", () => {
    console.log("Write completed!:");
    // check also writen data 
    readFile.on("data", (chunk) => console.log("Read successfully: ", chunk.length));

    // check end
    readFile.on("end", () => console.log("read done successfully")
    );

    // check if any error while reading

    readFile.on("error", (err) => console.log("gettign error while reading: ", err));
});


