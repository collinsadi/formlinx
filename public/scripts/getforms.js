const formsTable = document.getElementById("form-table")
const modal = document.getElementById("success-modal")
const modalcontent = document.getElementById("modal-message")
const modaltitle = document.getElementById("message-title")



const getforms = async () => {
    
    const response = await fetch("/api/form/user/forms", {
        method: "GET",
        headers: {
            "content-type":"application/json"
        }
    })

    const data = await response.json()

    if (data.forms && data.forms.length > 0) {
        
        formsTable.innerHTML = data.forms.map(x => {
            return `
            
             <tr>
                        <td>${x.formName}</td>
                        <td>${x.formUrl.split("/").pop()}</td>
                        <td>${x.submissions}</td>

                        ${x.deactivated ? `
                        <td> <button onclick="activateForm(this)" data-formurl=${x.formUrl}  class="manage">Enable</button> </td>` : `
                        <td> <button onclick="deactivateForm(this)" data-formurl=${x.formUrl} class="disable">Disable</button> </td>
`}


                        <td> <button data-formurl=${x.formUrl}  onclick="ShowWarning(this)" class="delete">Delete</button> </td>
                        <td><button  data-formurl=${x.formUrl}  onclick="copyurl(this)" class="manage">Copy Url</button></td>
                    </tr>

            
            `
        }).join("")

    }

    if (data.forms && data.forms.length === 0) {
       formsTable.innerHTML = "You Dont Have any Active Form"  
     }

  

}


const deactivateForm = async (button) => {

    const url = button.dataset.formurl

    const response = await fetch("/api/form/user/forms/deactivate?form=" + url, {
        method: "POST",
        headers: {
            "content-type":"application/json"
        },
        body: JSON.stringify({action:"deactivate"})
    })
    
    const data = await response.json()

    if (response.ok) {
        modal.style.display = "block"
        modalcontent.innerHTML = data.message
        
        setTimeout(() => {
            location.reload()
        }, 100);
    }

    if(data.status === "error"){

         modal.style.display = "block"
        modalcontent.innerHTML = data.message
        modaltitle.innerHTML = "Error!"
        modaltitle.style.color = "red"
        modalcontent.style.color = "red"

    }
}


const activateForm = async (button) => {
    
      const url = button.dataset.formurl

    const response = await fetch("/api/form/user/forms/deactivate?form=" + url, {
        method: "POST",
        headers: {
            "content-type":"application/json"
        },
        body: JSON.stringify({action:"activate"})
    })
    
    const data = await response.json()

    if (response.ok) {
        modal.style.display = "block"
        modalcontent.innerHTML = data.message
        setTimeout(() => {
            location.reload()
        }, 100);
    }

    if(data.status === "error"){

         modal.style.display = "block"
        modalcontent.innerHTML = data.message
        modaltitle.innerHTML = "Error!"
        modaltitle.style.color = "red"
        modalcontent.style.color = "red"

    }

}

const copyurl = async (button) => {
       const url = button.dataset.formurl

    await navigator.clipboard.writeText(url)

    button.innerHTML = "Copied"
}


const ShowWarning = async (button) => {

      const url = button.dataset.formurl

    const warningmodal = document.getElementById("warningModal")
    const btn = document.getElementById("delete-button")

    warningmodal.style.display = "block"

    btn.setAttribute("data-formurl", url)
}


const deleteForm = async (button) => {
      const url = button.dataset.formurl

    const response = await fetch("/api/form/user/forms/delete?form=" + url, {
        method: "POST",
        headers: {
            "content-type":"application/json"
        }
    })
    
    const data = await response.json()

    if (response.ok) {
        modal.style.display = "block"
        modalcontent.innerHTML = data.message
        setTimeout(() => {
            location.reload()
        }, 100);
    }

    if(data.status === "error"){

         modal.style.display = "block"
        modalcontent.innerHTML = data.message
        modaltitle.innerHTML = "Error!"
        modaltitle.style.color = "red"
        modalcontent.style.color = "red"

    }

}


const closeModal = () => {
    modal.style.display = "none"
}

const closeWarning = () => {
    
    const warningmodal = document.getElementById("warningModal")

    warningmodal.style.display = "none"

}

getforms()