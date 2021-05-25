/*******************************************************************
*NAME: ANTOINE AUGER-MAROUN
*DATE: 2021-05-25 13:05:31
*OBJECT: Show error message if login infos are wrong. Remove them after 5 seconds
*FICHIER: login.js
/*******************************************************************/

window.addEventListener('load', () => {


    //Remove error message each 5 seconds
    setInterval(() => {
        if (document.querySelector('.error') != null ){
            setTimeout(() => {
                document.querySelector('.error').remove();
            }, 5000);
        }
    }, 500);


})






