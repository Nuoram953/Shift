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
let cpm = null;
let date = null;

window.addEventListener("load", () =>{
    canvas = document.getElementById("chart");
    ctx = canvas.getContext("2d");

    ctx.canvas.parentNode.style.width = "400px";
    ctx.canvas.parentNode.style.height = "400px";

    player = document.getElementById("player").textContent;
    cpm = document.getElementById('cpm').textContent.split(",");
    date = document.getElementById('date').textContent.split(",").forEach(element => element = Date.parse(element));

    console.log(cpm);
    console.log(date);

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date,
            datasets: [{
                label: '# of Votes',
                data: cpm,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2,
            }]
        },
        options: {
            responsive: true, 
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
})

