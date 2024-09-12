const express = require('express')

const app = express();

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