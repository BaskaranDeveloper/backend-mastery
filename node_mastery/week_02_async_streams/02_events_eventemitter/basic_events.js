// const EvenEmitter = require("events");
const emitter = new (require("events"))();

// ⚙️ 2️⃣ The Core Concept: EventEmitter Class
// create instance 
// const emitter = new EvenEmitter();

// Listen for a event

emitter.on("greet", (name) => {
    console.log(`Hello ${name}! welcome to Node Events`);

});

emitter.emit("greet", "Baskaran");


// ⚙️ 3️⃣ Multiple Listeners + Order of Execution

emitter.on("data", () => console.log("First listener"));
emitter.on("data", () => console.log("Second listener"));

emitter.emit("data");


// ⚙️ 4️⃣ One-Time Listeners

// Use .once() when you want a listener to run only once.
emitter.once("connect", () => {
    console.log("Connected only once!");

});

emitter.emit("connect");
emitter.emit("connect");


// ⚙️ 5️⃣ Removing Listeners

function log() {
    console.log("Event triggerd!");

};

emitter.on("test", log);
emitter.emit("test");//output


emitter.removeListener("test", log);//removed
emitter.emit("test");// No output



// ⚙️ 6️⃣ Inheriting EventEmitter (Real Node Pattern)

// Every Node core object (like HTTP req, res, fs streams) inherits EventEmitter.
const EventEmitter = require("events");

class Logger extends EventEmitter {
    // create fun
    log(message) {
        console.log("LOG", message);
        this.emit("messageLogger", { id: Date.now(), message })

    }
};


// instance
const logger = new Logger();

// Listen for the event
logger.on("messageLogger", (arg) => {
    console.log("Listener called with: ", arg);

});


// Trigger
logger.log("Hello from logger");


