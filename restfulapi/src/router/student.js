const express = require('express')

const router = new express.Router();

const Student = require('../models/students')

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

// define route folder
router.get('/', (req,res) => {
    res.send("hello from Home page")
})



router.post("/students", async(req,res) => {
    try{
        const user = new Student(req.body)

    const create = await user.save();
    res.status(201).send(create)
    }catch(err){
        res.status(400).send(err)
    }
})


router.get('/students', async (req, res) => {
    try{
        
       const studentData =  await Student.find()
       res.send(studentData)
        
    }catch(err){
        res.send(err)
    }
})

router.get('/students/:id', async(req, res) => {
    try{
        const _id = req.params.id;
        const studentData = await Student.findById(_id);

        if(!studentData){
            return res.status(404).send();
        }else{
            res.send(studentData);
        }

    }catch(err){
        res.status(500).send(err)
    }
})
// ipdate by its email 

router.patch("/students/:email", async (req, res) => {
    try{
        const email = req.params.email
        const upStud = await Student.findOneAndUpdate({email: email}, req.body,{
            new: true
        })
        
        if(upStud){
            res.status(200).send(upStud)
        }else{
            res.status(404).send(upStud)
        }
    }catch(err){
           res.send(err) 
    }
})

// update the students by its id

router.patch("/students/:id", async (req,res) => {
    try{
        const _id = req.params.id
        const updateStudent = await Student.findByIdAndUpdate(_id, req.body,{
            new: true
        })
        res.send(updateStudent)
    }catch{
        res.status(404).send(updateStudent)
    }
})

// delete the student

router.delete("/students/:id", async (req, res) => {
    try{
       const deleteStudent = await Student.findByIdAndDelete(req.params.id);

       if(!deleteStudent.id){
            return res.status(400).send();
       }
       res.send(deleteStudent)
    }catch(err){
        res.status(500).send(err)
    }
})


module.exports = router