import { factory } from './factory.js'

const WORDS = 10;

let ctx = null;
let canvas = null;
let index = 0;
let inputHistory = [];
let x = null;
let first = true;
let word = null;
let wordIndex = 0

let words = [];

let currentWord = null;

window.addEventListener("load", () => {

  factory(WORDS).then((data) => {

    words = data
    //currentWord = words[wordIndex]
    currentWord = "and"

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.textAlign = "center";

    word=prep(currentWord)
    x = (canvas.width / 2) - caclPX(currentWord);

    ctx.fillText(currentWord[ind], x, 50);
  //  x += 25;



    window.addEventListener("keydown", (event) => {

      if (first) {
        x += 25;
        first = false;
      }

      keyInput(event.key);

      //Erase canvas and redraw user inputs
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      inputHistory.forEach((element) => {
        ctx.fillStyle = element.color;
        ctx.fillText(element.key, element.position, 50);

      });

      x += 25;

      //Redraw missing letter
      if (inputHistory.length < currentWord.length) {
        let tempX = x

        for (let temp = inputHistory.length; temp <= currentWord.length; temp++) {
          ctx.fillStyle = "black";
          console.log(tempX);
          ctx.fillText(currentWord.charAt(temp), tempX, 50);
          tempX += 25;
        }
      }
    });
  })
});



const caclPX = (word) => {
  let distance = [];
  for (let index = 0; index < word.length; index++) {
    distance.push(ctx.measureText(word[index]).width);
    distance.push(25)
    
  }

  distance.pop()

  let temp = 0
  for (let px in distance) {
    temp += distance[px]
  }

  console.log(distance);

  return Math.floor(temp / 2)
}



const prep = (currentWord) => {
  //let x = canvas.width / 2 - caclPX(currentWord);
  //console.log(`Value of X at the beginning ${x}`);
//
  //  x += 25;
//
  //for (let ind in currentWord) {
//
  //  ctx.fillStyle = "black";
  //  console.log(`Value of X when it appears ${x} --- ${currentWord[ind]}`);
  //  ctx.fillText(currentWord[ind], x, 50);
  //  x += 25;
//
  //}


  let x = canvas.width / 2 - caclPX(currentWord);
  let word = []
  for (let char in curentWords) {
    word.push({color: "black",position:x})
    x += 25;
  }

  return word;
}

const keyInput = (key) => {

  if (key == currentWord[index] && key != "Backspace" && key != "Enter") {
    inputHistory.push({ color: "green", position: x, key: key });
    index++;
  } else if (key != currentWord[index] && key != "Backspace" && key != "Enter") {
    inputHistory.push({ color: "red", position: x, key: currentWord[index] });
    index++;
  } else if (key == "Backspace") {
    index--;
  } else if (key == "Enter") {
    wordIndex++;
    currentWord = words[wordIndex];
    index = 0;
    inputHistory = [];
    prep(currentWord)


    x = 600 - caclPX(currentWord);
  }



}

