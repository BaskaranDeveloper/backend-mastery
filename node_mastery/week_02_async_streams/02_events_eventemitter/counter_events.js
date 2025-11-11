const EventEmitter = require("events");


// class for counter
class Counter extends EventEmitter {
    start(limit) {
        // increment and limit
        for (let i = 1; i <= limit; i++) {
            this.emit("tick", i);
        };
        // once cout total
        this.emit("done", limit);
    }
}

// intance
const counter = new Counter();

// call tick for listen
counter.on("tick", (num) => console.log("Tick", num));
// at once for total
counter.once("done", (total) => console.log(`Done counting total to ${total}`));

counter.start(5);

