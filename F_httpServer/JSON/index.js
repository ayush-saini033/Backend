const fs = require('fs')

const bioData = {
    name: "ayush",
    age: 19,
    branch: "Civil"
}

// console.log(bioData.age)

const jsonData = JSON.stringify(bioData);
console.log(jsonData)
// not possible 
// console.log(jsonData.name)

const objData = JSON.parse(jsonData)
console.log(objData)
console.log(objData.name)

fs.writeFile('json1.json',jsonData,(err) => {
    console.log('done')
})

fs.readFile('json1.json',"utf-8",(err,data) => {
    console.log(data)

    const orgData = JSON.parse(data)

    console.log(orgData)
})