const express = require('express')
const path = require('path')
const app = express();
const hbs = require('hbs');
const requests = require('requests');

// there are two types of path
// relative, absolute

// console.log(__dirname)

const staticPath = path.join(__dirname, "../public")
const templetPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.use(express.static(staticPath))
// to set the view engine at hbs
app.set('view engine', "hbs")
app.set("views", templetPath)
// app.set('views','../views')

hbs.registerPartials(partialsPath)

// set the views directory
// app.set('views',path.join(__dirname, '../views'));

// console.log('views',path.join(__dirname, '../views'))

// serve the file from the public directory
// app.use(express.static(path.join(__dirname, "../public")))
// console.log(path.join(__dirname, "../public"))

// builtin middleware
// app.use(express.static(staticPath));

// templet engine route
app.get("/", (req,res) =>{
    res.render('index', {
        tips: "official",
    })
})

// routing
// app.get(route, callback)

app.get('/temp', (req, res) => {
    requests(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=1af77fe152bea2a7f96f45b102c97dbf`)
        .on('data', (chunk) => {
            const objData = JSON.parse(chunk);
            const newarr = [objData]
            // console.log(newarr)
            // .join("") converted array into string
            // const realTimeData = newarr.map((val) => replaceval(homeFile, val)).join("")

            console.log(`city name is ${newarr[0].name} and the temp is ${(newarr[0].main.temp -273.15).toFixed(2)}°`)
            res.write(newarr[0].name)
            // console.log(realTimeData)
        })
        .on('end', (err) => {
            if (err) return console.log("connection closed due to errrors ", err)
                res.end();
        })
})

app.get('/about', (req,res) => {
    // console.log(req.query)
    // console.log(req.query.name)
    res.render('about', {
        name: req.query.name,
        age: req.query.age
    })
})

app.get('/about/*', (req,res) => {
    res.render('404', {
        errorcomment : "Opps this about us page couldn't be found"
    })
})

// it check all the routes other than which are defined
//  * => universal operator 
app.get('*', (req,res) => {
    res.render('404', {
        errorcomment : "Opps page couldn't be found"
    })
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