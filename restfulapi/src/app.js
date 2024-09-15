const express = require('express');
require("./db/conn")
const  Student = require('./models/students')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json());

// define route folder
app.get('/', (req,res) => {
    res.send("hello from Home page")
})

/*
app.post('/students', (req,res) => {
    console.log(req.body)
    const user = new Student(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})
    */

app.post("/students", async(req,res) => {
    try{
        const user = new Student(req.body)

    const create = await user.save();
    res.status(201).send(create)
    }catch(err){
        res.status(400).send(err)
    }
})

app.listen(port, () => {
    console.log(`connection is setup at port no. ${port}`)
})