const formsTable = document.getElementById("form-table")



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
                        <td> <button data-formid=${x._id} class="disable">Disable</button> </td>
                        <td> <button data-formid=${x._id} class="delete">Delete</button> </td>
                        <td> <a href="/dashboard/forms/${x._id}"> <button class="manage">Manage</button></a> </td>
                    </tr>

            
            `
        }).join("")

    }

    console.log(data)

}

getforms()