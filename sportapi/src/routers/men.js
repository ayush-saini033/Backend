const express = require('express')
const router = new express.Router();
const MenRanking = require("../models/men")

router.get('/', async(req, res) => {
    res.send("Hello from the ayush")
})

// we will handel post req

router.post("/men", async (req, res) => {
    try{
        const addingMenRecord = new MenRanking(req.body)
        console.log(req.body)
        const insertMan = await addingMenRecord.save();
        res.status(201).send(insertMan)

    }catch(err){
        res.status(400).send(err)
    }
})

// we will handel get req

router.get("/men", async (req, res) => {
    try{
        const getMen = await MenRanking.find({}).sort({ranking: 1})
        res.send(getMen)

    }catch(err){
        res.status(400).send(err)
    }
})

// we will handle get req of individual

router.get("/men/:id", async (req, res) => {
    try{
        const _id = req.params.id;
        const getMan = await MenRanking.findById(_id)
        res.send(getMan)
    }catch(e){
        res.status(400).send(e)
    }
})

// we will handel update

router.patch("/men/:id", async (req, res) => {
    try{
        const _id = req.params.id;
        const getMan = await MenRanking.findByIdAndUpdate(_id, req.body,{
            new: true
        })
        res.send(getMan)
    }catch(e){
        // server related error
        res.status(500).send(e)
    }
})

// we will handel delete

router.delete("/men/:id", async (req, res) => {
    try{
        const getMan = await MenRanking.findByIdAndDelete(req.params.id)
        res.send(getMan)
    }catch(e){
        // server related error
        res.status(500).send(e)
    }
})

module.exports = router;