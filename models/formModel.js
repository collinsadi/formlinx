const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const formSchema = new Schema({

    formName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    returnUrl: {
        type: String,
        required: true
    },
    failUrl: {
        type: String,
        required: true
    },
    thankYouPage_headline: {
        type: String,
        required: true
    },
    thankYouPage_message: {
        type: String,
        required: true
    },
    thankYouPage_returnText: {
        type: String,
        required: true
    },
    formUrl: {
        type: String,
        required: true
    },
    submissions: {
        type: Number,
        default: 0
       
    },
    deactivated: {
        type: Boolean,
        default: false
       
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
   




},{timeseries: true})


const Form = mongoose.model("form", formSchema)

module.exports = Form