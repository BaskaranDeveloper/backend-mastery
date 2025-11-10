const fs = require("fs");
//  Example 1 — Asynchronous Read
console.log("1 start reading file....");

// now read a file using fs.readFile

fs.readFile("sample.txt","utf-8",(err,data)=>{
    // handle error
    if(err){
      console.error("❌ Error reading file:", err);
      return;
    }else{
        console.log("2 File content:\n", data);
        
    }
});

console.log("3 End of the script (main thread continue)");

//  Example 2 — Asynchronous Write

fs.writeFile("data.txt","This is written asynchronously!",(err)=>{
    if(err)return console.error("Write error:", err);
    console.log("File written successfully!");
    
});


// Example 3 — Compare Sync vs Async Timing

console.time("sync");
const syncData = fs.readFileSync("sample.txt","utf-8");
console.timeEnd("sync");

console.time("async");
fs.readFile("sample.txt","utf-8",()=>{
    console.timeEnd("async");
});


// Example 4 — Promises + async/await Style

// Modern Node (v14+) has fs.promises API:

const fs = require("fs").promises;

async function run() {
  try {
    const data = await fs.readFile("sample.txt", "utf-8");
    console.log("✅ Async/Await content:\n", data);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

run();
// Same non-blocking behavior — just cleaner syntax.



// Internal Timing with the Event Loop

console.log("A");
fs.readFile("sample.txt",()=>console.log("B"));
setTimeout(()=>console.log("C"),0);
Promise.resolve().then(()=>console.log("D"));
console.log("E");