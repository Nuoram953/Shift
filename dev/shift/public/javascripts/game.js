/*******************************************************************
*NAME: ANTOINE AUGER-MAROUN
*DATE: 
*OBJECT: 
*FICHIER: 
/*******************************************************************/


import { factory } from './factory.js'

const HEIGHT = 50;
const WORDS = 2;

const INVALID_KEY = ['Shift','Enter','Backspace']

let words = []
let index = 0
let currentChar = 0;

let ctx = null;
let canvas = null;

window.addEventListener("load", () => {

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    factory(WORDS,canvas,ctx).then((data) => {
        
        words = data;

        words[index]['start'] = Date.now();
        show(words[index]['word'])

        window.addEventListener('keydown', (event) => {
            keyInput(event.key);
            show(words[index]['word'])

        })
    })
})


const show = (word) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < word.length; i++) {
        ctx.fillStyle = word[i]['color'];
        ctx.fillText(word[i]['char'], word[i]['position'], HEIGHT);
    }
}


const keyInput = (key) => {

    console.log(key);
    if (key == "Enter") {

        if (index == WORDS-1){
            toJSON();
        }

        words[index]['end'] = Date.now();
        words[index]['cpm'] = (words[index]['end']-words[index]['start'])/1000
        calculateCPM();
        index++;
        words[index]['start'] = Date.now();
        currentChar = 0
    }
    else if (key == words[index]['word'][currentChar]['char'] && !INVALID_KEY.includes(key)) {
        words[index]['word'][currentChar]['color'] = "green"
        currentChar++

    } else if (key != words[index]['word'][currentChar]['char'] && !INVALID_KEY.includes(key)) {
        words[index]['word'][currentChar]['color'] = "red"
        currentChar++;

    } else if (key == "Backspace") {
        currentChar--;

    } 

    
}

const calculateCPM = () =>{

    let avg = 0
    let count = 0

    for(let i in words){
        console.log(words[i]['cpm']);
        if (words[i]['cpm'] != null){
            avg += parseFloat(words[i]['cpm']); 
            count++;
        }
    }

    avg = avg/count

    console.log(avg);
    document.getElementById('cpm').innerText = avg
}

const toJSON = () =>{

   
    fetch("/game/result", {
        method: "POST",
        body: JSON.stringify({
          "test": "test fin de partie",

        }),
        headers: { "Content-Type": "application/json" },
        redirect:"manual"
        }).then((response) => response.json())
        .then((data)=>{
            console.log(data);
            window.location.replace(data['url'])
        })
 
        .catch(console.error);
}
