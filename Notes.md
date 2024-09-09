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