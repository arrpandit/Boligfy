const { Router } = require('express')
const User = require('../models/user')
const router = Router();

router.get("/signin", (req, res) => {
    return res.render("signin");
})

router.post("/signin", async (req, res) => {
    const { email, password } = req.body
    let d = await User.mathPassword(email, password)
    console.log("datatatata------", d)

    res.redirect("/")


})

router.get("/signup", (req, res) => {
    return res.render("signup");
})

router.post("/signup", (req, res) => {
    const { fullname, email, password } = req.body
    User.create({
        fullname,
        email,
        password
    })

    return res.redirect("/");
})


module.exports = router;