// create req for file system as fs
const fs = require("fs");

// write file using writeFileSync
fs.writeFileSync("data.txt","Learning Node.JS");
// read file using readFileSync
const text = fs.readFileSync("data.txt","utf-8");
console.log(text);
