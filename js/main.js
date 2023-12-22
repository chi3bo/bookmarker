var siteName = document.getElementById("siteName")
var siteUrl = document.getElementById("siteUrl")
var nameRegex= /\w{2,}/i ;
var urlRegex = /^((https:\/\/){0,1}(www.){0,1}[A-Za-z0-9]{3,}.[A-Z]{2,4})$/i
//                 once or not            7rof or numbers mn 3 w tale3    lazem .com     
var indexUpdate = 0

var linksList = []

function getLocalStorage(){
    var backup = JSON.parse(localStorage.getItem("linksMemory"))
    if (backup != null) {
        linksList = backup
    }
    showdata()
}
getLocalStorage()




function addItems(){

    if (nameRegex.test(siteName.value) && urlRegex.test(siteUrl.value))  {
        if (siteUrl.value.includes("https://")) {
            var item = {
                name : siteName.value ,
                link : siteUrl.value
            } 
        }
        else{
            var item = {
                name : siteName.value ,
                link : "https://"+siteUrl.value
            } 
        }
    
        linksList.push(item)
        showdata()
        clearInputs()
    
        localStorage.setItem("linksMemory" , JSON.stringify(linksList)  )


    }
    else{
        document.querySelector("#myModal").classList.remove("d-none")
    }
// -----------------



}

function clearInputs() {
    siteName.value = ''
    siteUrl.value = ''
    
}

function deleteItem(indexDelete){

    linksList.splice(indexDelete , 1)

    localStorage.setItem("linksMemory" , JSON.stringify(linksList)  )
    showdata()
}


function showdata(){
    shasha = ''

    for (i= 0 ;  i < linksList.length ; i++) {

        shasha += 
        `
        <tr>
        <td>${i+1}</td>
        <td>${linksList[i].name}</td>
        <td> <button class="btn btn-success" > <a href="${linksList[i].link}" target="_blank"> Visit </a> </button> </td>
        <td> <button onclick="deleteItem(${i})" class="btn btn-danger" > Delete </button> </td>
        </tr>
        `
    }

    document.getElementById("tableBody").innerHTML = shasha

}

function makeSureUrel() {
   if (urlRegex.test(siteUrl.value)) {
    document.querySelector("#siteUrl").classList.add("is-valid")
    document.querySelector("#siteUrl").classList.remove("is-invalid")
    document.querySelector("#urlAlert").classList.add("d-none")


   }
   else {
    document.querySelector("#siteUrl").classList.add("is-invalid")
    document.querySelector("#siteUrl").classList.remove("is-valid")
    document.querySelector("#urlAlert").classList.remove("d-none")
   }
}

function makeSureName() {
    if (nameRegex.test(siteName.value)) {
     document.querySelector("#siteName").classList.add("is-valid")
     document.querySelector("#siteName").classList.remove("is-invalid")
     document.querySelector("#nameAlert").classList.add("d-none")

 
    }
    else {
     document.querySelector("#siteName").classList.add("is-invalid")
     document.querySelector("#siteName").classList.remove("is-valid")
     document.querySelector("#nameAlert").classList.remove("d-none")

    }
 }


document.querySelector("#myModal").addEventListener("click" , getTarget)

function getTarget(e) {
    var myClick = e.target.id     
    if (myClick  == "myModal" || myClick  == "xMark" ) {
        document.querySelector("#myModal").classList.add("d-none")
    }
    else{
        console.log("stay");
    }


}