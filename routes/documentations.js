
const userRoute = require('../documentation/Users.doc')



const swaggerDocumentations = {

    openapi: "3.0.0",
    info: {

        title : "Codellins",
      version: "1.0.0",
      description: "API Platform For FrontEnd Developers"
    },
    servers: [

        {
            url: "http://localhost:8000",
            description: "Local Server"
        },
  
    ],
    tags: [

      {  
        name: "User",
        description: "Users Routes"
    }


    ],
    paths: {

        ...userRoute,
  
    }

};




module.exports = swaggerDocumentations