const jwt = require("jsonwebtoken")
require("dotenv").config()
const jwtsecret = process.env.JWT_SECRET


const checkCookie = async (req, res, next) => {

    const token = req.cookies.token;

    if(!token) {

        // res.status(401).json({ message: 'Unauthorized'})

       res.status(401).json({status:"error", message:"unAuthorized"})
        return;
    }


    try {

        const decoded = await jwt.verify(token, jwtsecret)
        req.user = decoded.user
        next()
    } catch (error) {
        return res.status(401).json({status:"error", message:"unAuthorized"})
    }




}


module.exports = checkCookie