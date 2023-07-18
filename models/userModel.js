const mongoose = require("mongoose")
const Schema = mongoose.Schema;



const userSchema = new Schema({

    firstName: {
        required: true,
        type:String,
    },
    lastName: {
        required:true,
        type:String
    },
    email:{
        required: true,
        type:String
    },
    password:{
        required: true,
        type:String
    },
    token: {
        type:String
    },
    activated: {
        type: Boolean,
        default: false
    },
    validation: {
        type: String
    },
    logged: {
        type: Boolean,
        default: false
    }



}, { timestamps: true })


const User = mongoose.model("user", userSchema)


module.exports = User