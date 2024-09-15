require('dotenv').config()
const express = require('express')
const app = express();
const path = require('path')
const hbs = require('hbs');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookie = require("cookie-parser")
const auth = require("./middleware/auth")

require("./db/conn")
const Register = require('./models/register');
const port = process.env.PORT|| 3000;

const staticPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.use(express.json())
app.use(cookie())
// if you are not using postman , to show the output
app.use(express.urlencoded({extended:false}))
app.use(express.static(staticPath))
app.set("view engine", "hbs");
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// console.log(process.env.SECRET_KEY)

app.get("/", (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/logout', auth, async(req, res) => {
    try{
        console.log(req.user)
        
        /*
        for single logout

        req.user.tokens = req.user.tokens.filter((currEl) => {
            return currEl.token !== req.token
        })
            */

        // for all logout
        req.user.token = [];

        res.clearCookie('jwt')

        console.log('logout successfully')
        await req.user.save()
        res.render('login')
    } catch(err) {
        res.status(500).send()
    }
})

app.get('/allout', auth, async(req, res) => {
    try{
        console.log(req.user)
        // for all logout
        req.user.tokens = [];

        res.clearCookie('jwt')

        console.log('logout successfully')
        await req.user.save()
        res.render('login')
    } catch(err) {
        res.status(500).send()
    }
}) 

app.get('/register', (req,res) => {
    res.render('register')
})

app.get('/search', auth, (req,res) => {
    // console.log(`this is the cookie awesome ${req.cookies.jwt}`);
    res.render('search')
})

app.post('/register', async (req,res) => {
    try{
        const password = req.body.password;
        const Cpassword = req.body.confirmpassword;

        if(password === Cpassword){
            const registerEmployee = new Register({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword,
                gender: req.body.gender,
                phone: req.body.phone
            })

            console.log(registerEmployee)

            const token = await registerEmployee.gerateAuthToken()
            // console.log(token)

            res.cookie("jwt", token,{
                expires:new Date(Date.now() + 60000),
                // client scripting language can't effect
                httpOnly:true,
                // it runs only on secure connection
                // secure:true
            })

            console.log(req.cookies.jwt)

            // password hash :- middelware
            const regiterData = await registerEmployee.save();
            res.status(201).render('successfully');
        }else{
            res.send("passwords are not matching")
        }
    }catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})

app.get('/login', (req,res) => {
    res.render('login')
})

app.post('/login', async(req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email: email})

        const isMatch = await bcrypt.compare(password, useremail.password)

        // middelware
        const token = await useremail.gerateAuthToken()
        // console.log(token)

        res.cookie("jwt", token,{
            expires:new Date(Date.now() + 60000),
            // client scripting language can't effect
            httpOnly:true
        })
        
        console.log(req.cookies.jwt)

        if(isMatch){
            res.status(201).render('index')
        }else{
            res.send("invalid password")
        }
    }catch(err){
        res.status(400).send("invalid email")
    }
})

app.listen(port, () => {
    console.log(`Server is running at port no. ${port}`)
})