const express = require("express")
const router = express.Router()
const cors = require("cors")

const  {sendForm,newForm,thankyoupage,getuserforms,deactivateform} = require("../controllers/formControllers")
// const checkLogin = require("../middlewares/authMiddleWare")
const checkCookie = require("../middlewares/cookieChecker")

router.post("/new",checkCookie,newForm)
router.post("/:formid",cors(),sendForm)
router.get("/thanks", thankyoupage)
router.get("/user/forms",checkCookie,getuserforms)
router.post("/user/forms/deactivate",checkCookie,deactivateform)






module.exports = router