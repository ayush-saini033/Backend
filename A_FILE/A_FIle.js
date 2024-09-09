const fs = require("fs");

// welcome to learn the backend is override by helo ayush

// fs.writeFileSync('read.txt', 'welcome to learn the nackend')
// fs.writeFileSync('read.txt', 'hello ayush')

// fs.appendFileSync('read.txt'," how are you?")

// buffer is used to store mainly binary data
const BufferData = fs.readFileSync('readWrite.txt');
console.log(BufferData)

const originalData = BufferData.toString();
console.log(originalData)

// to rename the file

fs.renameSync('readWrite.txt', 'A_readWrite.txt')