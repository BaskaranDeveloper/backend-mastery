const fs = require("fs");

// 1 create Read stream 

const readStream = fs.createReadStream("large.txt");

// 2 create write as copy  using stream
const writeStream = fs.createWriteStream("copy_large.txt");

// 3 copy
readStream.pipe(writeStream);



// check finish

writeStream.on("finish", () => console.log("Done writing")
);