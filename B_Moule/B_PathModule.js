const path = require('path')

console.log(path.dirname('/home/ayush/Desktop/Backend-2/B_Moule/B_PathModule.js'))
console.log(path.extname('/home/ayush/Desktop/Backend-2/B_Moule/B_PathModule.js'))
console.log(path.basename('/home/ayush/Desktop/Backend-2/B_Moule/B_PathModule.js'))

// return the object
console.log(path.parse('/home/ayush/Desktop/Backend-2/B_Moule/B_PathModule.js'))

const myPath = path.parse('/home/ayush/Desktop/Backend-2/B_Moule/B_PathModule.js')
console.log(myPath.name)
console.log(myPath.ext)