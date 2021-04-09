/*******************************************************************
*NAME: ANTOINE AUGER-MAROUN
*DATE: 09/04/2021
*OBJECT: Show user's past games
*FICHIER: history.js
/*******************************************************************/

let canvas = null;
let ctx = null;

window.addEventListener("load", () =>{
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");


    fetch("/history", {
        method: "POST",
        body: JSON.stringify({
            date: Date.now(),
            words: words,
            cpm: parseInt(calculateCPM(), 10)*60,
            type: "normal",
            score: null,
            stats: calculateStats()
        }),
        headers: { "Content-Type": "application/json" },
        redirect: "manual"
    }).then((response) => response.json())
        .then((data) => {
            console.log(data);
            window.location.replace(data['url'])
        })

        .catch(console.error);
})