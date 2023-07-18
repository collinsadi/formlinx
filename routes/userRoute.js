const express = require("express")
const router = express.Router()
const {signUp,verifyEmail,logIn,forgottenPassword,resetPassword} = require("../controllers/userControllers")




router.post("/users/signup",signUp)
router.post("/users/signup/verify",verifyEmail)
router.post("/users/login",logIn)
router.post("/users/password/forgotten",forgottenPassword)
router.post("/users/password/reset",resetPassword)






module.exports = router