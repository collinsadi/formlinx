const changePasswordButton = document.getElementById("change_button")
const urlparams = new URLSearchParams(location.search)
const token = window.location.href.split("=")[1]

if (!token) {
    
    window.location.href = "/login"
}

const newpassword = document.getElementById("new_password")
const confirmPassword = document.getElementById("confirm_password")
const emailerror = document.getElementById("email-error")

const changePassword = async () => {
    
const response = await fetch("/users/password/reset", {
        method: "POST",
        headers: {
            "content-type":"application/json"
        },
    body: JSON.stringify({
        token,
        newPassword: newpassword.value
            
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
            window.location.href = "/login"
        }, 1000);
    }

}


changePasswordButton.addEventListener("click", (e) => {

  console.log(token)
    
    if (!token) {
        emailerror.innerHTML = "Token Not Found"
        emailerror.style.color = "red"
        return
    }

    if (newpassword.value.length < 6) {
        emailerror.innerHTML = "Password Must Be at least 6 characters"
        emailerror.style.color = "red"
        return
    }

    if (newpassword.value !== confirmPassword.value) {
        emailerror.innerHTML = "Passwords Do Not Match"
        emailerror.style.color = "red"
        return
    }

    e.target.innerHTML = "Loading.."
    e.target.disabled = true

    setTimeout(() => {

        changePassword()
            .then(() => {
        e.target.innerHTML = "Set Password"
        e.target.disabled = false

        })
        
    }, 1000);


})