// alert("connected")

const firstName = document.getElementById("fname")
const lastName = document.getElementById("lname")
const email = document.getElementById("email")
const password = document.getElementById("pass")
const confirmPassword = document.getElementById("cpass")
const checkbox = document.getElementById("ts");
const button = document.getElementById("signup_btn")
const signuperror = document.getElementById("track-signup")
const signSection = document.getElementById("sign_section")
const emailsection = document.getElementById("email-section")





const signup = async () => {

    const response = await fetch("/users/signup", {
        method: "POST",
        headers: {
            "content-type":"application/json"
        },
        body: JSON.stringify({

            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,

        })
    })

    const data = await response.json()
    
    if (data.status === "error"){
        
        signuperror.innerHTML = data.message
        signuperror.style.color = "red"
    }

    if (response.ok) {
        
        signuperror.innerHTML = data.message
        signuperror.style.color = "green"
        localStorage.setItem("email", data.email)

            setTimeout(() => {

        signSection.style.display = "none"
        emailsection.style.display = "block"

                
            }, 1000);
       
        
    }

   
}


button.addEventListener("click", (e) => {
    
    if (checkbox.checked !== true) {
        
        signuperror.innerHTML = "You Must Agree to Terms of Use"
        signuperror.style.color = "red"
        return
    }



    if (password.value.length < 6) {
        
        signuperror.innerHTML = "Password Must Be 6 Characters and Above"
        signuperror.style.color = "red"
        return
    }

    if (password.value !== confirmPassword.value) {
        
        signuperror.innerHTML = "Passwords Dont Match"
        signuperror.style.color = "red"
        return
    }

    
    e.target.innerHTML = "Signing ..."
    

    setTimeout(() => {
        signup()
            .then(() => {
            e.target.innerHTML = "Sign Up"
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

