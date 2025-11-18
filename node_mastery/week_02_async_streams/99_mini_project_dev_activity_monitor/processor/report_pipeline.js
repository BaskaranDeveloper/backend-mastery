const fs = require("fs");
const path = require("path");
const { pipeline } = require("stream/promises");
const EventEmitter = require("events");


class ReportProcessor extends EventEmitter {
    async generateReport(fileInput, fileOutput, ...transform) {
        try {
            await pipeline(
                // create read
                fs.createReadStream(fileInput),
                // transform
                ...transform,
                // create write
                fs.createWriteStream(fileInput)
            );

            // emitter
            this.emit("reportReady");

        } catch (err) {

            this.emit("error", err);

        }

    }
};

module.exports = ReportProcessor;