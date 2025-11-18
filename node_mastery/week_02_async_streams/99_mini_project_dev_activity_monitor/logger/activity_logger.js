const fs = require("fs");

class ActivityLogger {
    // create a constructor 
    constructor(logFile) {
        this.stream = fs.createWriteStream(logFile, { flags: "a", encoding: "utf-8" });
    };

    // write function
    write(activity) {
        const line = `${activity}\n`;
        this.stream.write(line);
    }
}

//export module
module.exports = ActivityLogger;