const express = require('express')
const path = require('path')
const app = express();

// there are two types of path
// relative, absolute

// console.log(__dirname)

const staticPath = path.join(__dirname, "../public")
const templetPath = path.join(__dirname, "../templates")

app.use(express.static(staticPath))
// to set the view engine at hbs
app.set('view engine', "hbs")
app.set("views", templetPath)
// app.set('views','../views')

// set the views directory
// app.set('views',path.join(__dirname, '../views'));

// console.log('views',path.join(__dirname, '../views'))

// serve the file from the public directory
// app.use(express.static(path.join(__dirname, "../public")))
// console.log(path.join(__dirname, "../public"))

// builtin middleware
// app.use(express.static(staticPath));

// templet engine route
app.get("", (req,res) =>{
    res.render('index', {
        tips: "official",
    })
})

// routing
// app.get(route, callback)

app.get('/about', (req,res) => {
    res.render('about')
})

app.get("/",(req, res) => {
    res.send("Hello World from the express")
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