const sidebartoggle = document.getElementById("toggle-side")
const sidebar = document.getElementById("side-bar")
const closebutton = document.getElementById("close-side")


if(sidebartoggle){

  sidebartoggle.addEventListener("click", () => {
   
  sidebar.style.display = "flex"
  closebutton.style.display = "block"

  })
  
}

if (closebutton) {
  
  closebutton.addEventListener("click", () => {
    sidebar.style.display = "none"
  closebutton.style.display = "none"
  })
}