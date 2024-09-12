const http = require('http');

const fs = require('fs');

const requests = require('requests');

const replaceval = (tempval, orgval) => {
    let temperature = tempval.replace("{%tempval%}", (orgval.main.temp - 273.15).toFixed(2))
    temperature = temperature.replace("{%tempmin%}", (orgval.main.temp_min - 273.15).toFixed(2))
    temperature = temperature.replace("{%tempmax%}", (orgval.main.temp_max - 273.15).toFixed(2))
    temperature = temperature.replace("{%location%}", orgval.name)
    temperature = temperature.replace("{%country%}", orgval.sys.country)
    temperature = temperature.replace("{%tempstatus%}", orgval.weather[0].main)

    return temperature;
}

const homeFile = fs.readFileSync('Home.html', 'utf-8')

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        requests('https://api.openweathermap.org/data/2.5/weather?q=alwar&appid=1af77fe152bea2a7f96f45b102c97dbf')
        .on('data', (chunk) => {
            const objData = JSON.parse(chunk);
            const newarr = [objData]
            // console.log(newarr)
            // .join("") converted array into string
            const realTimeData = newarr.map((val) => replaceval(homeFile, val)).join("")
            res.write(realTimeData)
            // console.log(realTimeData)
        })
        .on('end', (err) => {
            if (err) return console.log("connection closed due to errrors ", err)
                res.end();
        })
    }
})

server.listen(3000, '127.0.0.1');