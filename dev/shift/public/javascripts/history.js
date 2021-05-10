/*******************************************************************
*NAME: ANTOINE AUGER-MAROUN
*DATE: 09/04/2021
*OBJECT: Show user's past games
*FICHIER: history.js
/*******************************************************************/



let canvas = null;
let ctx = null;

let games = null;


window.addEventListener("load", () => {
    canvas = document.getElementById("chart");
    ctx = canvas.getContext("2d");


    
    let cpm = document.getElementById('cpm').textContent.split(",");
    let dateFormat = [];
    document.getElementById('date').textContent.split(",").forEach(element => {
        let temp = new Date(element)
        dateFormat.push(`${temp.getDate()}/${temp.getMonth()+1}/${temp.getFullYear()}`)

    })

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dateFormat.reverse(),
            datasets: [{
                data: cpm.reverse(),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1

            }]
        },
        options: {
            title:{
                display:true,
                text: "Distribution du CPM selon les 6 dernières parties"
            },
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
                    borderWidth: 5

                }



            },
            spanGaps: true,
            layout:{
                padding:0
            }
        },
    });

})