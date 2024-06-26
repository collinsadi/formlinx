const express = require("express")
const app = express()
const mongoose = require("mongoose")
const morgan = require("morgan")
const cookieparser = require("cookie-parser")
require("dotenv").config()

const url = process.env.MONGO_URI
const swaggerDocumentations = require('./routes/documentations')
const swaggerDocs = require('swagger-ui-express')



// Require the Routes
const userRoute = require("./routes/userRoute")
const formRoute = require("./routes/formRoute")
const pageRoute = require("./routes/pageRoute")


// Port and Server

const port = process.env.PORT 

app.listen(port, () => {
    
    console.log("Server Started at Port 8000")
})

// Connect to the DataBase

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log("Connected to DataBase Successfully")
})
    .catch((error) => {
    console.log("Could Not Connect DataBase",error)
    })



// MiddleWares
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/docs',swaggerDocs.serve)
app.use('/docs',swaggerDocs.setup(swaggerDocumentations))
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(cookieparser())


// routes
app.use(pageRoute)
app.use(userRoute)
app.use("/api/form", formRoute)



// 404 page

app.use((request, response) => {
    response.status(404).render("404")
})