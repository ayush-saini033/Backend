const fs = require("fs");

// Synchronus
/*
const data = fs.readFileSync('B_read.txt', 'utf-8')
console.log(data)
console.log('after the data')
*/

// Asynchronus

fs.readFile('B_read.txt', 'utf-8',(err,data) => {
    console.log(data)
})
console.log('after the data')