// Handle GET /notes → Read JSON file
const fs = require("fs");
const http = require("http");


const file = "data.txt";

// create a file if not exits
if(!fs.existsSync(file)){
    fs.writeFileSync(file,"Hello Node.JS - Initial file created.\n"); 
}

// start server
const PORT = 3000;
const server = http.createServer((req,res)=>{
    // Set headers for all responses
    res.setHeader("Content-Type", "text/plain");

    // check it was GET or POST

    if(req.url ==="/" && req.method ==="GET"){
        // read a file
        const notes = fs.readFileSync(file,"utf-8");
        res.end(notes);
    }else if(req.url==="/notes" && req.method==="POST"){
        // write a file
        // step 1: create  body for that file
        let body = "";

        // step 2: collect data chunks
        req.on("data",(chuck)=>{
            body+=chuck.toString();
        });

        // step 3: once data full recived
        req.on("end",()=>{
            fs.appendFileSync(file,`\n${body}`);
            res.writeHead(201);
            res.end("✅ Data written to file successfully!");
        });


    }else{
        res.writeHead(404);
        res.end("Page not found!")
    }

});

// server listen
server.listen(PORT,()=>console.log(`Server running at http://localhost:${PORT}`));