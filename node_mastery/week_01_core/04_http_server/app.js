// create http server
// step 1: require http module
const http = require("http");

// step 2: create server object
const server = http.createServer((req,res)=>{
    // handle request and response
    // using if else condition for multiple routes
    if(req.url ==="/"){
        // redirect to the Home page
        res.end("Welcome to Home Page!")

    }else if(req.url ==="/about"){
        res.end("About Page!")
    }else{
        res.writeHead(404);
        res.end("Not Found");
    }
});

// listen the port
server.listen(3000,()=>console.log("Server running on port http://localhost:3000"));