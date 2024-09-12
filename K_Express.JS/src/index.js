const express = require('express')
const path = require('path')
const app = express();

// there are two types of path
// relative, absolute

// console.log(__dirname)

const staticPath = path.join(__dirname, "../public")



// builtin middleware
app.use(express.static(staticPath));

// routing
// app.get(route, callback)

app.get("/",(req, res) => {
    res.send("Hello World from the express")
})

app.get('/about', (req,res) => {
    res.send("Hello from the about page")
})

app.listen(3000, () => {
    console.log("listening the port at 3000")
})

/*
API 
get -> read
post -> create
put -> update
delete - > remove
*/