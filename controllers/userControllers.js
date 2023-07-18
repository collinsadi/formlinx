const User = require("../models/userModel")
const expressAsyncHandler = require("express-async-handler")

const bcrypt = require("bcrypt")
const uuid = require("uuid")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const sendEmail = require("../middlewares/sendEmail")

const jwtsecret = process.env.JWT_SECRET

const signUp = expressAsyncHandler(async (request, response) => {
    

    const { firstName, lastName, email, password} = request.body
    

    
        try{


        if (!firstName) {
                
                response.status(422).json({status:"error", message:"First Name is Missing"})
                return
            }
            if (!lastName) {
                
                response.status(422).json({status:"error", message:"Last Name is Missing"})
                return
            }
            if (!email) {
                
                response.status(422).json({status:"error", message:"Email is Missing"})
                return
            }
            if (!password) {
                
                response.status(422).json({status:"error", message:"Password is Missing"})
                return
            }

            const existingUserByEmail = await User.findOne({ email })
            
            if (existingUserByEmail) {
                
                response.status(401).json({status:'error', message:"Email Already in Use"})
                return
            }
            const hashedPassword = await bcrypt.hash(password, 10)


           
            const validation = await uuid.v4()
            

            const newDeveloper = await User.create({firstName, lastName, email, password:hashedPassword, validation})
            

            await newDeveloper.save()

            sendEmail(email,"Email Verification",`use this code to Validate Your Email Address <h3>${validation}</h3>`)

            response.status(200).json({status:"success", message:"Sign Up Successful, Please Verify Your Email Address"})



        } catch (error) {
            
            response.status(500).json({status:"error", message:'Internal Server Error'})
            console.log(error)
        }

   

})

const verifyEmail = expressAsyncHandler(async (request, response) => {

    const { email, validation } = request.body
    


    try {

       
            if (!email) {
                
                response.status(401).json({status:"error", message:"Email Not Found"})
                return
            }

            if (!validation) {
                response.status(401).json({status:"error", message:"Validation Key Not Found"})
                return
            }

            const user = await User.findOne({email})

            if(!user){

                response.status(404).json({ status:"error", message:"User Not Found"})
                return
            }

            if(validation !== user.validation){

                response.status(401).json({status:"error", message:"Invalid Validation Key"})
                return

            }

            user.validation = null
            user.activated = true

            
            const token = jwt.sign({ user }, jwtsecret)

            user.token = token

            await user.save()

            response.status(200).json({status:"success", message:"Email Verified Successfully", firstName:user.firstName, lastName: user.lastName, token,})


    } catch (error) {

    response.status(500).json({status:"error",message:"Internal Server Error"})
    console.log(error)

    }
    
    
    

})

const logIn = expressAsyncHandler(async (request, response) => {

    const { email, password } = request.body
    
    try {
        
        if (!email) {
            
            response.status(422).json({status:"error",message:"Email Missing"})
            return
        }
        if (!password) {
            
            response.status(422).json({status:"error",message:"Pasword Missing"})
            return
        }

        const user = await User.findOne({ email })
        
        if (!user) {
            
            response.status(401).json({status:"error",message:"Invalid Credentials"})
            return
        }

        const passwordIsValid = await bcrypt.compare(password, user.password)

        if (!passwordIsValid) {
            
            response.status(401).json({status:"error", message:"Invalid Credentials"})
            return
        }
        

        if (!user.activated) {

            const validation = await uuid.v4()
            
            user.validation = validation

            await user.save()

            sendEmail(email,"Email Verification",`use this code to Validate Your Email Address <h3>${validation}</h3>`)

            response.status(401).json({status:"error", message:"Please Validate your Email and Try Again"})
            return
        }
        user.logged = true

        await user.save()

        response.status(200).json({status:"success", message:"Logged In Successfully",firstName:user.firstName, lastName: user.lastName, token:user.token})

    }catch(error){

        response.status(500).json({status:"error",message:"Internal Server Error"})
        console.log(error)
    }

})

const forgottenPassword = expressAsyncHandler(async (request, response) => {

    const email = request.body.email
    

    try {
        
        if(!email){

            response.status(422).json({status:"error",message:"Email Missing"})
            return
        }

        const user = await User.findOne({ email })
        
        if (!user) {
            
            response.status(401).json({status:"error", message:"Invalid Credentials"})
            return
        }
       
        const validation = await uuid.v4()
            
            user.validation = validation

            await user.save()

        const sendToken = sendEmail(email, "Password Reset", `use this code to Reset Your Password <h3>${validation}</h3>`)
        
        if (!sendToken) {
            
            response.status(422).json({status:"error",message:"Could Not Send Token"})
            return
        }

        response.status(200).json({status:"success",message:"Password Reset Token Sent"})

    } catch (error) {
        
        response.status(500).json({status:"error",message:"Internal Server Error"})
        console.log(error)
    }


 })

const resetPassword = expressAsyncHandler(async (request, response) => { 

    const { email, token, newPassword } = request.body


    try {
        
            if (!email) {

            response.status(422).json({status:"error",message:"email is missing"})
            return
                
            }
            if (!token) {

            response.status(422).json({status:"error",message:"token Missing"})
            return
                
            }
            if (!newPassword) {

            response.status(422).json({status:"error",message:"Enter New Password"})
            return
                
        }
        
        const user = await User.findOne({ email })
        
        if (!user) {
            
            response.status(401).json({status:"error",message:"Invalid Credentials"})
            return
        }
        
        if (token !== user.validation) {
            response.status(401).json({status:"error",message:"Invalid Token"})
            return
        }


        if (!user.activated) {
            
            user.activated = true
        }
        
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        
        user.password = hashedPassword
        user.validation = null

        await user.save()

        response.status(200).json({status:"success",message:"Password Reset Successful"})


    } catch (error) {
        response.status(500).json({status:"error", message:"Internal Server Error"})
        console.log(error)

    }
    
    
 })

module.exports = {signUp,verifyEmail,logIn,forgottenPassword, resetPassword}