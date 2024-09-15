const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const emloyee = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    confirmpassword: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]

});

emloyee.methods.gerateAuthToken = async function(){
    try{
        const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token: token})

        await this.save();
        return token
    }catch(err) {
        // res.send('the error part', err)
        console.log('the error part', err)
    }
}

emloyee.pre("save",async function(next){
   if(this.isModified("password")){
     // const passowrdHash = await bcrypt.hash(password, 10)
     this.password = await bcrypt.hash(this.password, 10)
     
    //  confimpassword field not saved
    // this.confirmpassword = undefined
    this.confirmpassword = await bcrypt.hash(this.password, 10)
     
   }
    next()
} )

const Register = new mongoose.model('Register',emloyee);

module.exports = Register