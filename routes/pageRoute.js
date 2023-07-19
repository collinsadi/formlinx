const express = require("express")
const router = express.Router()


router.get("/", (request, response) => {
    
    response.render("index")

})


router.get("/dashboard", (request, response) => {

    const token = request.set 

    if (!token) {
            response.render("join")

        return
    }
    
})




module.exports = router