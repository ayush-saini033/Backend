```javascript
const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    // console.log(req.url)
    if(req.url === '/'){
        res.end("Hello Ayush")
    }
    else if(req.url === '/about'){
        res.end("hello Ayush it is the about page")
    }
    else if(req.url === '/contact'){
        res.write("hello ayush it is the contact page")
        res.end();
    }
    else if(req.url === '/userapi'){
        fs.readFile(`${__dirname}/UserAPI/userapi.json`,"utf-8",(err,data) =>{
            console.log(data)
            const objData = JSON.parse(data)

            // res.end(objData[0].userId)
            res.end(objData[0].firstName)
        });
    }
    else{
        // for network status
        // you can pass any information to the network
        res.writeHead(404, {'content-type': "text/html", "name" : "ayush"})
        res.end(`<h1 style="color:red">404 error pages. Page does not exist</h1>`) 
    }
    // res.end('Hello from the other sides , and it is second time');
})

server.listen(3000, "127.0.0.1", () => {
    console.log('listening to the port no. 3000')
})
```

``` javascript
const express = require('express')
const path = require('path')
const app = express();

// there are two types of path
// relative, absolute

// console.log(__dirname)

const staticPath = path.join(__dirname, "../public")

app.use(express.static('/public'))
// to set the view engine at hbs
app.set('view engine', "hbs")
// app.set('views','../views')

// set the views directory
app.set('views',path.join(__dirname, '../views'));

console.log('views',path.join(__dirname, '../views'))

// serve the file from the public directory
app.use(express.static(path.join(__dirname, "../public")))
console.log(path.join(__dirname, "../public"))

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
```