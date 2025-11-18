const EventEmitter = require("events");

class ActivityEmitter extends EventEmitter {
    // create a function 
    logActivity(activity) {
        this.emit("activity", activity);
    }
};

// export this module
module.exports = ActivityEmitter;