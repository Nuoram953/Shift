/*******************************************************************
*NAME: ANTOINE AUGER-MAROUN
*DATE: 
*OBJECT: 
*FICHIER: 
/*******************************************************************/


import { factory } from './factory.js'

const HEIGHT = 50;
const WORDS = 10;

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

    factory(WORDS).then((data) => {
        for (let word in data) {
            words.push(prep(data[word]));
        }

        console.log(words[index][currentChar]);
        show(words[index])

        window.addEventListener('keydown', (event) => {
            keyInput(event.key);
            show(words[index])

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

const prep = (word) => {
    let x = (canvas.width / 2) - caclPX(word);
    let test = [];

    for (let char in word) {
        test.push({ color: "black", position: x, char: word[char] })
        x += 25;
    }
    return test
}

const caclPX = (word) => {
    let distance = 0;
    for (let index = 0; index < word.length; index++) {
        distance += ctx.measureText(word[index]).width;

    }
    return distance
}

const keyInput = (key) => {

    if (key == "Enter") {
        index++;
        currentChar = 0
    }
    else if (key == words[index][currentChar]['char'] && key != "Backspace" && key != "Enter") {
        words[index][currentChar]={ color: "green", position:words[index][currentChar]['position'], char: words[index][currentChar]['char'] }
        currentChar++

    } else if (key != words[index][currentChar]['char'] && key != "Backspace" && key != "Enter") {
        words[index][currentChar]={ color: "red", position:words[index][currentChar]['position'], char: words[index][currentChar]['char'] }
        currentChar++;

    } else if (key == "Backspace") {
        currentChar--;

    } else {

    }



}

