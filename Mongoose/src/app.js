const mongoose = require('mongoose')

const validator = require('validator')

/*
mongoose.connect("mongodb://localhost:27017/firstdb", {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => console.log("Connection successfull..."))
.catch((err) => console.log(err));
*/

const dbURI = "mongodb://localhost:27017/firstdb"

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connection Successfull....."))
.catch((err) => console.error("Failed to connect to MongoDB",err))

// Schema :- A mongoose schema defines the structure of the document, dafult values, validators etc.

const studentSchema = new mongoose.Schema({
    name : {
        // validators
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
        // custom error
        minlength: [2, 'minimum 2 letters'],
        maxlength: 30,
    },
    roll : {
        type: Number,
        validate:{
            validator:function(value){
                return value > 0
            },
            message: "roll can't be negative"
        },
        required: true
    },
    age : {
        type: Number,
        validate(value){
            if(value < 0) {
                throw new Error('age cant be negative')
            }
        },
        required: true
    },
    active : {
        type: Boolean,
        require: true
    },
    course : {
        type: String,
        enum: ["frontend", "backend", "full stack"],
        lowercase: false,
        trim: true,
    },

    email : {
        type: String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid')
            }
        }
    }

    /*
    date : {
        type: Date,
        default: Date.now
    }
    */
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

        const pakki = new Studentlist({
            name: "   pakki yadav     ",
            roll: -20,
            age: -19,
            active: false,
            course: "backend"
        })
        const result = await Studentlist.insertMany([pakki]);
        console.log(result)
    }catch(err){
        console.log(err)
    }
}
createDocumet()

const getDocument = async () => {
    try{
        const result1 = await Studentlist.find({name: "Ayush Saini"});
    console.log(result1)
    const result2 = await Studentlist.find({age: 19}).select({name: 1, _id:0})
    console.log(result2)
    const result3 = await Studentlist.find({active: true}).select({name: 1, _id:0}).limit(1)
    console.log(result3)
    }catch(err){
        console.log(err)
    }
}

// getDocument()

const filter = async () => {
    try{

        // $gt :- grater than
        const result1 = await Studentlist
        .find({age: {$gt : 19}})
        .select({name : 1, _id : 0})
        console.log(result1)

        // $gte :- greater than equal to
        const result2 = await Studentlist
        .find({age: {$gte : 19}})
        .select({name : 1, _id : 0})
        console.log(result2)

        // $lte :- less than or equal to
        const result3 = await Studentlist
        .find({age: {$lte : 18}})
        .select({name : 1, _id : 0})
        console.log(result3)

        // $in :- if included 
        const result4 = await Studentlist
        .find({active: {$in : [false]}})
        .select({name : 1, _id : 0})
        console.log(result4)

        const result6 = await Studentlist
        .find({age: {$in : [18,20]}})
        .select({name : 1, _id : 0})
        console.log(result6)

        // $nin :- not in
        const result5 = await Studentlist
        .find({age: {$nin: [20]}})
        .select({name : 1, _id : 0})
        console.log(result5)
        
    }catch(err){
        console.log(err)
    }
}
// filter()

const logical = async () => {
    const result1 = await Studentlist
        .find({$or : [{active: true} , {age: 19}]})
        .select({name : 1, _id : 0})
        console.log(result1)

        const result2 = await Studentlist
        .find({$and : [{active: true} , {age: 19}]})
        .select({name : 1, _id : 0})
        console.log(result2)
        
        const result4 = await Studentlist
        .find({$nor: [{active: true} , {age: 19}]})
        .select({name : 1, _id : 0})
        console.log(result4)

        const result3 = await Studentlist
        .find({age: {$not: {$gt: 18}}})
        .select({name : 1, _id : 0})
        console.log(result3)
}


// logical()

const Count = async () => {
    const result1 = await Studentlist
    .find({active: true, age: {$gte: 19}})
    .select({name: 1, _id: 0})
    .countDocuments();

    console.log(result1)

    const result2 = await Studentlist
    .find({age: {$gte: 18}})
    .select({name: 1, _id: 0})
    .sort({name : -1});

    console.log(result2)
}

// Count();

const updateDocument = async (_id) => {
    try{
        const result1 = await Studentlist.updateOne({_id},{
            $set : {
                name: "Krishn Kant Rajput"
            }
        });
        console.log(result1)
    }catch(err){
        console.log(err)
    }

    try{
        const result2 = await Studentlist.findByIdAndUpdate({_id},{
            $set : {
                name: "Krishn Kant Rajput Sir"
            }
        },{
            // new: true for console the latest value
            new : true,
            useFindAndModify : false
        });
        // it gives the previous data
        console.log(result2)
    }catch(err){
        console.log(err)
    }
}

// updateDocument("66e55b5946d5e9897b996997")

const deleteDocument = async(_id) => {
    try{
        const result1 = await Studentlist.deleteOne({_id});
        console.log(result1)

        const result2 = await Studentlist.deleteMany({_id});
        console.log(result2)

        const result3 = await Studentlist.findByIdAndDelete({_id});
        console.log(result3)
    }catch(err){

    }
}

// deleteDocument("66e582a355071228b800fe1c")