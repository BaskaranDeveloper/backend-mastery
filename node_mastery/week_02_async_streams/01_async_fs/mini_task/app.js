const fs = require("fs").promises;

/*
// 1️⃣ Write “Start Log” asynchronously
fs.writeFile("log.txt", "utf-8", (err) => {
  // check if error
  if (err) {
    console.error("Error writing file: ", err);
    return;
  }
  console.log("Step 1: file created with 'Start log'");

  // 2️⃣ Wait 1 second
  setTimeout(() => {
    const timerstamp = new Date().toISOString(); //readable format
    const entry = `Timestamp: ${timerstamp}\n`;
    // 3️⃣ Append timestamp asynchronously
    fs.appendFile("log.txt", entry, (err) => {
      if (err) {
        console.error("Error appending file:", err);
        return;
      }
    });

     console.log("Step 2: Timestamp appended");

    // 4️⃣ Read full file asynchronousl
    fs.readFile("log.txt","utf-8",(err,data)=>{
        if(err){
            console.error("Error reading file:",err);
            return;
        }
        console.log("Step 3: File content:\n");
        console.log(data);
        
        
    })
  }, 1000);//wait 1sec
});
*/


// Optional (Advanced): Async/Await Version (Cleaner, Modern)

async function runLogSystem(){
    try {
        // Step 1: write file
        await fs.writeFile("log.txt","Start log\n","utf-8");
        console.log("Step 1: File created");

        // step 2: wait 1 sec
        await new Promise((res)=>setTimeout(res,1000));

        // Step 3: Timestamp append
        const timestamp = new Date().toISOString();
        const entry = `timestamp: ${timestamp}\n`
        await fs.appendFile("log.txt",entry,"utf-8");
        console.log("Step 2: timestamp appended");

        // step 4: read file
        const data = await fs.readFile("log.txt","utf-8");
        console.log("Step 3: File content\n", data);
        
    } catch (error) {
         console.error("Error:", error);
    }
}


runLogSystem();