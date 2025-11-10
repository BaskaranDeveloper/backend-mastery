const fs = require("fs");

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

