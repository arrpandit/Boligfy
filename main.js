
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const cookieparser = require('cookie-parser')

const routs = require("./router/user");
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const PORT  = process.env.PORT || 3000

//middleware
app.use(express.urlencoded({extended:false}))
app.use(cookieparser());
app.use(checkForAuthenticationCookie("token"));


//mongodb connect
mongoose.connect('mongodb://localhost:27017/blogify').then(()=>{
    console.log("Mongoose Db connected")
}).catch((err)=>{
    console.log("Mongoose not connected"+err);
})

app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

//by default render
app.get("/",(req,res)=>{
    res.render("home",{
        user:req.user
    });
})

//user routes
app.use("/user",routs)

app.listen(PORT , ()=>{
    console.log(`Server ie runnig at port ${PORT}`);
})