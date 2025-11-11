const EvenEmitter = require("events");


// create a class
class OrderSystem extends EvenEmitter {
    createOrder(orderId) {
        // 1: Announce creation
        console.log(`Order ${orderId} created`);

        // 2: Emit a single event with the orderId as payload
        this.emit("orderPlaced", orderId)

    };



}


// Instantiate the system
const system = new OrderSystem();

// Inventory Service listener
system.on("orderPlaced", (id) => {
    console.log(`Checking stock for Order ${id}`);

});

// Billing Service listener
system.on("orderPlaced", (id) => {
    console.log(`Processing payment for Order ${id}`);
});

// Notification Service listener
system.on("orderPlaced", (id) => {
    console.log(`Sending confirmation email for Order ${id}`);
    // After notification (or once all tasks done) we can emit completion
    system.emit("orderCompleted", id); //for trigger
});


// Order completed listener
system.on("orderCompleted", (id) => {
    console.log(`Order ${id} completed successfully!`);
});


// Test: create a couple orders
system.createOrder(101);
console.log(); // blank line
system.createOrder(102);