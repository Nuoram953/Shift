let ctx = null;
let canvas = null;
let index = 0;
let userInputHistory = {};
let x = 10;

let currentWord = "test";

window.addEventListener("load", () => {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText(currentWord, 10, 50);

  window.addEventListener("keydown", (event) => {
    console.log(event);

    if (event.key == currentWord[index] && event == "Backspace") {
      userInputHistory[event.key] = "green";
      console.log("Char est true");
    } else if (event.key != currentWord[index] && event == "Backspace") {
      userInputHistory[event.key] = "red";
      console.log("Char est false");
    } else if (event == "Backspace") {
      console.log(event.key);
    }

    event != "Backspace" ? index++ : (index -= 1);


  });
});
