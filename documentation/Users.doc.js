


const createUsers = {

    tags: ["User"],
    summary:"User Sign Up",
    description: "Api Endpoint for Creating New Users",
    requestBody: {

        content: {
            "Application/Json":{
                schema:{
                    type: "object",
                    properties:{
                        firstName: {
                            type: "string",
                            description: "Users First Name",
                            required: true,
                        },
                        lastName: {
                            type: "string",
                            description: "Users Last Name",
                            required: true,
                        },
                        email: {
                            type: "string",
                            description: "Users Email",
                            required: true,
                            unique: true,
                        },
                        userName: {
                            type: "string",
                            description: "Users Email",
                            required: true,
                            unique: true,
                        },
                        password: {
                            type: "string",
                            description: "Users Password",
                            required: true,
                        },
                        useCase: {
                            type: "string",
                            description: "Users Purpose of using website",
                            required: true,
                         
                        }
                    }
                }
            }
        }

    },
    responses: {
        200:{
            description: "Sign Up Sucessful",
            content: {
                "application/json":{
                    schema: {
                        type: "object",
                        example: {
                            status:"success",
                            message: "Sign Up Sucessful"
                        }
                    }
                }
            }
        },
        422:{
            description: "Email  in Use or Required Field Missing",
            content: {
                "application/json":{
                    schema: {
                        type: "object",
                        example: {
                            message: "Unable to sign Up User"
                        }
                    }
                }
            }
        },
        500:{
            description: "Server Side Error",
            content: {
                "application/json":{
                    schema: {
                        type: "object",
                        example: {
                            message: "an Error Occured on the Server Side"
                        }
                    }
                }
            }
        }
    }
}

const verifyEmail = {
    tags: ["User"],
    summary:"Email Verification",
    description: "Api Endpoint for Verifying User's Email",
    requestBody: {

        content: {
            "Application/Json":{
                schema:{
                    type: "object",
                    properties:{
                        email: {
                            type: "string",
                            description: "User Email"
                        },
                        validation: {
                            type: "string",
                            description: "code sent to user's email"
                        }
                    }
                }
            }
        }

    },
    responses : {
        200:{

            description: "Sucessful Login",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                             status:"success",
                            message: "Email Verified Sucessfully"
                        }
                    }
                }
            }
        },
        401: {
            description: "mising Fields",
            content: {
                "assplication/json": {
                    schema: {
                        type: "object",
                        example: {
                             status:"error",
                            message: "missing Fields"
                        }
                    }
                }
            }
        },
        404: {
            description: "not found",
            content: {
                "assplication/json": {
                    schema: {
                        type: "object",
                        example: {
                            status:"error",
                            message: "User Not Found"
                        }
                    }
                }
            }
        },
        500: {
            description: "Server Side Error",
            content: {
                "assplication/json": {
                    schema: {
                        type: "object",
                        example: {
                            status:"error",
                            message: "an Error Occured on the server side"
                        }
                    }
                }
            }
        },
    }

}
const logUsersIn = {
    tags: ["User"],
    summary:"User Log In",
    description: "Api Endpoint for Logging Users In",
    requestBody: {

        content: {
            "Application/Json":{
                schema:{
                    type: "object",
                    properties:{
                        email: {
                            type: "string",
                            description: "User Email"
                        },
                        password: {
                            type: "string",
                            description: "user password"
                        }
                    }
                }
            }
        }

    },
    responses : {
        200:{

            description: "Sucessful Login",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                             status:"success",
                            message: "Log In Sucessful"
                        }
                    }
                }
            }
        },
        401: {
            description: "Invalid Credentials",
            content: {
                "assplication/json": {
                    schema: {
                        type: "object",
                        example: {
                             status:"error",
                            message: "Invalid Credentials"
                        }
                    }
                }
            }
        },
        500: {
            description: "Server Side Error",
            content: {
                "assplication/json": {
                    schema: {
                        type: "object",
                        example: {
                            status:"error",
                            message: "an Error Occured on the server side"
                        }
                    }
                }
            }
        }
    }

}





const forgotPassword = {
    tags: ["User"],
    summary:"Forgotten Password",
    description: "Api Endpoint for resseting Forgotten Passwords",
    requestBody: {

        content: {
            "Application/Json":{
                schema:{
                    type: "object",
                    properties:{
                        email: {
                            type: "string",
                            description: "User Email"
                        }
                    }
                }
            }
        }

    },
    responses : {
        200:{

            description: "Token Sent",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                             status:"success",
                            message: "Password Reset Token Sent"
                        }
                    }
                }
            }
        },
        404: {
            description: "User not Found",
            content: {
                "assplication/json": {
                    schema: {
                        type: "object",
                        example: {
                             status:"error",
                            message: "Invalid Email"
                        }
                    }
                }
            }
        },
        500: {
            description: "Server Side Error",
            content: {
                "assplication/json": {
                    schema: {
                        type: "object",
                        example: {
                            status:"error",
                            message: "an Error Occured on the server side"
                        }
                    }
                }
            }
        }
    }

}

const resetPassword = {
    tags: ["User"],
    summary:"final password reset process",
    description: "Api Endpoint for Creating a new password for users if Token is valid",
    requestBody: {

        content: {
            "Application/Json":{
                schema:{
                    type: "object",
                    properties:{
                        email: {
                            type: "string",
                            description: "User Email"
                        },
                        newPassword: {
                            type: "string",
                            description: "New password"
                        },
                        token: {
                            type: "string",
                            description: "password reset Token"
                        },
                    }
                }
            }
        }

    },
    responses : {
        200:{

            description: "Sucess",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                             status:"success",
                            message: "Password Reset Succesfull"
                        }
                    }
                }
            }
        },
        401: {
            description: "Invalid Credentials",
            content: {
                "assplication/json": {
                    schema: {
                        type: "object",
                        example: {
                             status:"error",
                            message: "Invalid Credentials"
                        }
                    }
                }
            }
        },
        500: {
            description: "Server Side Error",
            content: {
                "assplication/json": {
                    schema: {
                        type: "object",
                        example: {
                            status:"error",
                            message: "an Error Occured on the server side"
                        }
                    }
                }
            }
        }
    }

}









const userRoute = {

    
    "/users/signup":  {

        post: createUsers,
    },
    "/users/signup/verify":  {

        post: verifyEmail,
    },
    "/users/login": {
        post: logUsersIn,
    },
    "/users/password/forgotten": {
        post: forgotPassword,
    },
    "/users/password/reset": {
        post: resetPassword,
    },


}

module.exports = userRoute