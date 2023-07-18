const jwt = require("jsonwebtoken")
require("dotenv").config()
const jwtsecret = process.env.JWT_SECRET

const checkLogin = async (request, response, next) => {



    if (request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {


        try {

            const token = request.headers.authorization.split(" ")[1];
            const decoded = await jwt.verify(token, jwtsecret)
            request.user = decoded.user

            next();


        } catch (error) {

            response.status(401).json({ status: "error", message: "Unauthorized" })
        }
            
    }

}



module.exports =  checkLogin