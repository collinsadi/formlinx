const Form = require("../models/formModel")
const shortid = require("shortid")
const sendEmail = require("../middlewares/sendEmail")

const   newForm = async (request, response) => {

    const owner = request.user._id
    
    let { formName, email, returnUrl, failUrl, thankYouPage_headline, thankYouPage_message, thankYouPage_returnText } = request.body

    try{



        if (!formName) {
                response.status(422).json({status:"error", message:"Form Name is Required"})
                return
        }
        
        if (!email) {
                response.status(422).json({status:"error", message:"Email is Required"})
                return
        }
        
        if (!returnUrl) {
                response.status(422).json({status:"error", message:"Return Url is Required to Specify Where to Return Users to from Thank You Page"})
                return
        }
        
        if (!failUrl) {
                response.status(422).json({status:"error", message:"Fail Url is Required to Specify Where to Return Users to if Form Submission is Unsuccesful"})
                return
        }
        
        if (!thankYouPage_headline) {

            thankYouPage_headline = "Thank You!"
            
        }
        
        if (!thankYouPage_message) {

            thankYouPage_message = "Your Form Was Submitted Successfully, You Would Hear From Us :)"
            
        }
        
        if (!thankYouPage_returnText) {

            thankYouPage_returnText = "Back"
            
            }


            const formid = await shortid.generate()
            const formUrl = `http://8000/api/form/${formid}`
    
            const form = await Form.create({ formName, email, returnUrl, failUrl, thankYouPage_headline, thankYouPage_message, thankYouPage_returnText, owner,formUrl })

            await form.save()

        response.status(201).json({status:"success", message:"Your Form Was Successfully Created", formUrl})



        

    }catch(error){
        response.status(500).json({status:"error", message:"Internal Server Error"})
        console.log(error)
    }

    
    

}

const sendForm = async (request, response)=>{

    const formId = request.params.formid
    const keys = Object.keys(request.body)
    const values = Object.values(request.body)


    const formUrl = `http://8000/api/form/${formId}`
   
    try {

        const form = await Form.findOne({ formUrl })
        
        if (!form) {
            
            response.status(404).json({status:"error", message:"Form Was Not Found"})
            return
        } 
        
        const email = form.email
        const title = `New Submission From ${form.formName}`
        let message = `<h3>Here is What Your Users Have to Say</h3><br><br>`

        keys.forEach(key => {
            
            const value = values[keys.indexOf(key)]
            
            message += `<h4>${key}: ${value}</h4>`
        })
        
        sendEmail(email,title,message)

        response.redirect(`/api/form/thanks?form=${formId}`)

    } catch (error) {
        
        response.status(500).json({status:"error", message:"Internal Server Error"})
        console.log(error)
    }
    


}

const thankyoupage = async (request, response) => {

    const formId = request.query.form
    const formUrl = `http://8000/api/form/${formId}`

    try {

     const form = await Form.findOne({ formUrl })
        
        if (!form) {
            
            response.status(404).json({status:"error", message:"Form Was Not Found"})
            return
        } 

        
        response.render("form",{returnUrl:form.returnUrl,title:form.thankYouPage_headline,message:form.thankYouPage_message,button:form.thankYouPage_returnText})


        
    }catch(error){

        response.status(500).json({status:"error", message:"OOPS! an Error Occured"})
        console.log(error)
    }
}



module.exports = {newForm, sendForm,thankyoupage}