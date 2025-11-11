const EventEmitter = require("events");


// create a class

class JobTracker extends EventEmitter {
    // create a event
    start(JobName) {
        console.log(`Starting job: ${JobName}`);
        // emit first 
        this.emit("started", JobName);
        // delay 1 sec
        setTimeout(() => {
            this.emit("progress", 50);
            // delay 1 sec again
            setTimeout(() => {
                this.emit("done", JobName);
            }, 1000);
        }, 1000);
    }
};


// create instance

const tracker = new JobTracker();

// listen
tracker.on("started", (name) => console.log(`${name}: started`));
tracker.on("progress", (p) => console.log(`Progress: ${p}%`));
tracker.on("done", (name) => console.log(`${name} completed`));

// call the function
tracker.start("Data Backup")