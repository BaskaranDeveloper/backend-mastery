const fs = require("fs");
const path = require("path");

// create a file path 

const filePath = path.join(__dirname, 'large.txt')

// create a stream for chunk

const stream = fs.createReadStream(filePath,
    {
        encoding: 'utf-8',
        highWaterMark: 16 * 1024 //64KB
    }
);


// now handling success
stream.on('data', (chunk) => {
    console.log("📦 Received chunk:", chunk.length, "bytes");
});

//now handling end
stream.on("end", () => {
    console.log("🎉 Finished reading file!");
});

//now handling error
stream.on('error', (err) => {
    console.error("❌ Error:", err);
})

