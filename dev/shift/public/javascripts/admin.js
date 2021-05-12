/*******************************************************************
*NAME: ANTOINE AUGER-MAROUN
*DATE: 12/04/2021
*OBJECT: Manage tab in sidebar on admin page
*FICHIER: admin.js
/*******************************************************************/


let btnOverview, btnLanguage = null
let overview,language = null

window.addEventListener("load", ()=>{

    btnOverview = document.getElementById("overview");
    btnLanguage = document.getElementById("language");

    overview = document.getElementById("section-overview");
    language = document.getElementById("section-language")

    btnOverview.addEventListener("click",()=>{
        removeClass();
        overview.classList.add('actif')
        btnOverview.classList.add('btn-admin-selected')
        
    })

    btnLanguage.addEventListener("click",()=>{
        removeClass();
        language.classList.add('actif')
        btnLanguage.classList.add('btn-admin-selected')
    })

})

const removeClass = () => {
    try{
        overview.classList.remove('actif')
        language.classList.remove('actif')
        btnOverview.classList.remove('btn-admin-selected')
        btnLanguage.classList.remove('btn-admin-selected')
    }catch{
        console.log('This class does not exist');
    }

}