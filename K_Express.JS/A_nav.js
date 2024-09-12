const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send("Welcome to my home page")
})

app.get('/about', (req, res) => {
    res.write('<h1>Hii My name is Ayush saini <h1>')
    res.send()
    // res.send("Welcome to my about page")
})

app.get('/contact', (req, res) => {
    res.status(200).send("Welcome to my contact page")
})

app.get('/temp', (req, res) => {
    res.status(200).send([
        {
            id: 1,
            name: "vinod"
        },
        {
            id: 2,
            name: "Ayush"
        }
    ])
})

app.get('/json', (req,res) => {
    res.json([
        {
            id: 1,
            name: "vinod"
        },
        {
            id: 2,
            name: "Ayush"
        }
    ])
})

app.listen(port, () => {
    console.log(`listening to the port no. ${port}`)
})