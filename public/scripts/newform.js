

const formname = document.getElementById("formname")
const email = document.getElementById("email")
const emailconfirm = document.getElementById("cemail")
const failurl = document.getElementById("failurl")
const returnurl = document.getElementById("returnurl")
const thankyoutitle = document.getElementById("typt")
const thhankyoumessage = document.getElementById('typm')
const returntext = document.getElementById('returntext')

const button = document.getElementById("create")

const error = document.getElementById("error")

const formSection = document.getElementById("form-container")
const formurlsection = document.getElementById("form-url-sect")
const codesnippet = document.getElementById("codesnippet")
const formcode = document.getElementById("form-code-url")


button.addEventListener("click", async (e) => {

    const response = await fetch("/api/form/new", {
        method: "POST",
        headers: {
            "content-type":"application/json"
        },
        body: JSON.stringify({

            formName: formname.value,
            email: email.value,
            returnUrl: returnurl.value,
            failUrl: failurl.value,
            thankYouPage_headline: thankyoutitle.value,
            thankYouPage_message: thhankyoumessage.value,
            thankYouPage_returnText: returntext.value,

        })
    })

    const data = await response.json()

    if (data.status === "error") {
        error.style.color = "red"
        error.innerHTML = data.message
    }

    if (response.ok) {

        formSection.style.display = "none"
        formurlsection.style.display = "block"
        codesnippet.innerHTML = `&lt;form action=&quot;${data.formUrl}&quot;  method=&quot;post&quot;&gt;
&lt;label for=&quot;email&quot;&gt;Your Email&lt;/label&gt;
&lt;input name=&quot;Email&quot; id=&quot;email&quot; type=&quot;email&quot;&gt;
&lt;button type=&quot;submit&quot;&gt;Submit&lt;/button&gt;
&lt;/form&gt;`
        formcode.value = `${data.formUrl}`
        
    }

    console.log(data)

})



const copycode = document.getElementById("copy-code")
const copysnippet = document.getElementById("copy-snippet")


if (copycode) {
    copycode.addEventListener("click", async () => {
        
        copycode.innerHTML = "copied"
        await navigator.clipboard.writeText(formcode.value)

    })
}


if (copysnippet) {
    copysnippet.addEventListener("click", async () => {
        
        copysnippet.innerHTML = "copied"
        await navigator.clipboard.writeText(codesnippet.value)

    })
}