const exppress = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = exppress();
app.use(exppress.static('public'));
app.set("view engine",'ejs')
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb://localhost:27017/usersDB");

const userSchema = {
    email: String,
    password: String
};


app.get("/", (req,res) => {
    res.render('home')
})
app.get("/login", (req,res) => {
    res.render('login')
})
app.get("/register", (req,res) => {
    res.render('register')
})

app.post("/register", async(req,res) => {
    try{
        const newUser = new User({
            email: req.body.username,
            password: req.body.password
        })
        let savedata = await newUser.save()
        if(savedata){
            res.render('secrets')
        }
    }catch(err) {
        console.log("error in saving data");
        
    }
});


app.listen(3000,console.log("server is running"));