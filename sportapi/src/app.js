const express = require('express');
require("../src/db/conn")
const router = require('./routers/men')
const MenRanking = require("../src/models/men")

const app = express()
const port = process.env.PORT || 3000;
app.use(express.json())

app.use(router)

app.listen(port, () => {
    console.log(`connection is live at por no. ${port}`)
})