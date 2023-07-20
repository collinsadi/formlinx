// alert("connected")
const email = document.getElementById("email")
const password = document.getElementById("pass")
const signuperror = document.getElementById("track-signup")
const signSection = document.getElementById("sign_section")
const emailsection = document.getElementById("email-section")
const button = document.getElementById("signup_btn")




const login = async () => {

    const response = await fetch("/users/login", {
        method: "POST",
        headers: {
            "content-type":"application/json"
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,

        })
    })

    const data = await response.json()
    
    if (data.status === "error"){
        
        signuperror.innerHTML = data.message
        signuperror.style.color = "red"
    }


    if (data.message === "Please Validate your Email and Try Again") {

        signuperror.innerHTML = data.message
        signuperror.style.color = "red"
        
        localStorage.setItem("email", data.email)

            setTimeout(() => {

        signSection.style.display = "none"
        emailsection.style.display = "block"

                
            }, 1000);
    }

    if (response.ok) {
        
        signuperror.innerHTML = data.message
        signuperror.style.color = "green"
        localStorage.setItem("email", data.email)

            setTimeout(() => {

        window.location.href = "/dashboard"

                
            }, 1000);
       
        
    }

    console.log(data)
}


button.addEventListener("click", (e) => {
    
   
    e.target.innerHTML = "Loging ..."
    

    setTimeout(() => {
        login()
            .then(() => {
            e.target.innerHTML = "Log In"
        })
    }, 1000);
    




})




// Verify Email

const VerificationCode = document.getElementById("verification_code")
const verifyButton = document.getElementById("verify_button")
const emailerror = document.getElementById("email-error")

verifyButton.addEventListener("click", (e) => {

    e.target.innerHTML = "verifying..."

    setTimeout(() => {

        verifyEmail()
            .then(() => {
            e.target.innerHTML = "Verify"
        })
        
    }, 1000);
    
})


const verifyEmail = async () => {
    
    const response = await fetch("/users/signup/verify", {
        method: "POST",
        headers: {
            "content-type":"application/json"
        },
        body: JSON.stringify({
            
            email: localStorage.getItem("email"),
            validation: VerificationCode.value,
        })
    })


    const data = await response.json()

    if(data.status === "error"){

    emailerror.innerHTML = data.message
    emailerror.style.color = "red"

    }


    if (response.ok) {
        emailerror.innerHTML = data.message
        emailerror.style.color = "green"

        setTimeout(() => {
            localStorage.clear()
        window.location.href = "/dashboard"
        }, 1000);

        
    }

}




// Password Reset

const resetbutton = document.getElementById("reset-button")
const passwordsection = document.getElementById("password-section")


const sendresetcode = async () => { 

const response = await fetch("/users/password/forgotten", {
        method: "POST",
        headers: {
            "content-type":"application/json"
        },
    body: JSON.stringify({
            
            email: email.value,
            
        })
    })


    const data = await response.json()

    if(data.status === "error"){

    signuperror.innerHTML = data.message
    signuperror.style.color = "red"

    }

    if (response.ok) {
        signuperror.innerHTML = data.message
        signuperror.style.color = "green"
    }

 }


resetbutton.addEventListener("click", (e) => {

    e.preventDefault();

    if (!email.value) {
        
        signuperror.innerHTML = "Enter an Email"
        signuperror.style.color = "red"

        return
    }

    sendresetcode();



})
