const mongoose = require('mongoose')

/*
mongoose.connect("mongodb://localhost:27017/firstdb", {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => console.log("Connection successfull..."))
.catch((err) => console.log(err));
*/

const dbURI = "mongodb://localhost:27017/firstdb"

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connection Successfull....."))
.catch((err) => console.error("Failed to connect to MongoDB",err))

// Schema :- A mongoose schema defines the structure of the document, dafult values, validators etc.

const studentSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    roll : {
        type: Number,
        required: true
    },
    age : {
        type: Number,
        required: true
    },
    active : {
        type: Boolean,
        require: true
    },
    // date : {
    //     type: Date,
    //     default: Date.now
    // }
})

// collection creation
const Studentlist = new mongoose.model("Student",studentSchema)

// create or insert document

const createDocumet = async () => {
    try{
        const krishn = new Studentlist({
            name: "Krishn Kant",
            roll: 54,
            age: 19,
            active: false
        })

        const rahul = new Studentlist({
            name: "Rahul Saini",
            roll: 72,
            age: 20,
            active: true
        })

        const ankit = new Studentlist({
            name: "Ankit Singh",
            roll: 20,
            age: 19,
            active: false
        })
        const result = await Studentlist.insertMany([krishn,rahul,ankit]);
        console.log(result)
    }catch(err){
        console.log(err)
    }
}
// createDocumet()

const getDocument = async () => {
    const result = await Studentlist.find();
}

getDocument()