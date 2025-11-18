const fs = require("fs").promises;
const ActivityEmitter = require("./emitter/activity_emitter");
const ActivityLogger = require("./logger/activity_logger");

const clean = require("./processor/clean_transform");
const lower = require("./processor/lowercase_transform");
const stamp = require("./processor/timestamp_transform");
const ReportProcessor = require("./processor/report_pipeline");

// 1) Setup emitter & logger
const activityEmitter = new ActivityEmitter();
const logger = new ActivityLogger("raw_logs.txt");

// log activity when the event accure
activityEmitter.on("activity", (msg) => logger.write(msg));

// simulate developer actions
activityEmitter.logActivity("Developer logged in");
activityEmitter.logActivity("Opened file main.js");
activityEmitter.logActivity("Saved file main.js");
activityEmitter.logActivity("Run build");
activityEmitter.logActivity("Developer logged out");


// 2 process at the end
const processor = new ReportProcessor();

processor.on("reportReady", async () => {
    console.log("📄 Daily report generated!");
    // write summery async
    await fs.writeFile("summary.txt", "Daily activity report is ready.", "utf-8");
    console.log("📘 Summary created!");
});

processor.on("error", (err) => {
    console.error("❌ Report generation failed:", err);

});


// report gen
processor.generateReport(
    "raw_logs.txt",
    "daily_report.txt",
    clean,
    lower,
    stamp
)