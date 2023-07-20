const formsTable = document.getElementById("form-table")
const modal = document.getElementById("success-modal")
const modalcontent = document.getElementById("modal-message")


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
                        <td> <button data-formid=${x._id} class="manage">Enable</button> </td>` : `
                        <td> <button onclick="deactivateForm(this)" data-formurl=${x.formUrl} class="disable">Disable</button> </td>
`}


                        <td> <button data-formid=${x._id} class="delete">Delete</button> </td>
                        <td><button class="manage">Copy Url</button></td>
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

    alert(url)

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
    }
}

getforms()