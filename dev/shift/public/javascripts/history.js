/*******************************************************************
*NAME: ANTOINE AUGER-MAROUN
*DATE: 09/04/2021
*OBJECT: Show user's past games
*FICHIER: history.js
/*******************************************************************/



let canvas = null;
let ctx = null;

let player = null;
let games = null;


window.addEventListener("load", () =>{
    canvas = document.getElementById("chart");
    ctx = canvas.getContext("2d");

    ctx.canvas.parentNode.style.width = "600px";
    ctx.canvas.parentNode.style.height = "400px";

    player = document.getElementById("player").textContent;
    let cpm = document.getElementById('cpm').textContent.split(",");
    let dateFormat = [];
    document.getElementById('date').textContent.split(",").forEach(element => {
        let temp = new Date(element)
        dateFormat.push(`${temp.getDay()}/${temp.getMonth()}/${temp.getFullYear()}`)
    })

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dateFormat.reverse(),
            datasets: [{
                label: 'CPM pour les dernières parties',
                data: cpm.reverse(),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1

            }]
        },
        options: {
            responsive: true, 
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                },
                x:{
                    borderWidth:5

                }

         
                
            },
            spanGaps:true
        },
    });
})

