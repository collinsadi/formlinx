const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
require("dotenv").config()
const jwtsecret = process.env.JWT_SECRET


  const authMiddleWare = async (req, res, next) =>{

    const token = req.cookies.token;

    if(!token) {

        // res.status(401).json({ message: 'Unauthorized'})

        res.render("join")
        return;
    }


    try {

        const decoded = await jwt.verify(token, jwtsecret)
        req.user = decoded.user
        next()
    } catch (error) {
        return res.render('join')
    }




}



router.get("/", (request, response) => {
    
    response.render("index")

})


router.get("/dashboard",authMiddleWare, (request, response) => {

  response.render("dashboard")

   
    
})

router.get("/login", (request, response) => {
    
    response.render("login")
})

router.get("/signup", (request, response) => {
    
    response.render("join")

})

router.get("/auth/login/password/reset", (request, response) => {

    const token = request.query.passwordresettoken

    if (!token) {
        
        response.redirect("/login")
        return
    }

    response.render("resetpassword")

})

router.get("/dashboard/forms/new", authMiddleWare, (request, response) => {
    
    response.render("newform")
})


module.exports = router