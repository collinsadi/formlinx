const express = require("express")
const router = express.Router()
const cors = require("cors")

const  {sendForm,newForm,thankyoupage} = require("../controllers/formControllers")
const checkLogin = require("../middlewares/authMiddleWare")

router.post("/new",checkLogin,newForm)
router.post("/:formid",cors(),sendForm)
router.get("/thanks",thankyoupage)






module.exports = router