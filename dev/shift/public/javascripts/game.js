import {factory} from './factory.js'


let ctx = null;
let canvas = null;
let index = 0;
let inputHistory = [];
let temp = [];
let word
let x = null;

let currentWord = "test";

window.addEventListener("load", () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    word=prep(currentWord)

    x = 600-(currentWord.length*25)+ctx.measureText(currentWord).width;

    let value = factory(10);
    value.then((data) => {
      console.log(data);
    })
    

  window.addEventListener("keydown", (event) => {
    console.log(event);

    if (event.key == currentWord[index] && event.key != "Backspace") {
      inputHistory.push({ color: "green", position: x, key: event.key });

    } else if (event.key != currentWord[index] && event.key != "Backspace") {
      inputHistory.push({ color: "red", position: x, key: currentWord[index] });
      
    } else if (event.key == "Backspace") {
      console.log(event.key);
    }

    event.key != "Backspace" ? index++ : (index -= 1);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    inputHistory.forEach((element) => {
       
      ctx.fillStyle = element.color;
      ctx.fillText(element.key, element.position, 50);
      
    });
    x += 25;
    console.log(x);

    
  if (inputHistory.length < currentWord.length && inputHistory.length != 0){
      
    let tempX = x

      for(let temp = inputHistory.length; temp <=currentWord.length; temp++){
        ctx.fillStyle = "black";
        ctx.fillText(currentWord.charAt(temp), tempX, 50);
        tempX += 25;
      }

  }
  });



});





const prep = (currentWord) =>{
    let x = 600-(currentWord.length*25)+ctx.measureText(currentWord).width;
    for(let index in currentWord){
       
        ctx.fillStyle = "black";
        ctx.fillText(currentWord[index], x, 50);
        x+= 25;

    }
}

