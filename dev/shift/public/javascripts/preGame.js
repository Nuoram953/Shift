/*******************************************************************
*NAME: ANTOINE AUGER-MAROUN
*DATE: 31/03/2021
*OBJECT: Get language and difficulty from user before starting a game
*FICHIER: preGame.js
/*******************************************************************/

let btn = null;
let language = null;
let difficulty = null;
let selected = {
  language: null,
  difficulty: null,
};

window.addEventListener("load", () => {
  btn = document.getElementById("btnStartGame");

  let nodesLanguage = document.querySelectorAll("div.language");
  let nodesDifficulty = document.querySelectorAll("div.difficulty");

  nodesLanguage.forEach((node) => {
    node.addEventListener("click", (node) => {
      if (language) {
        language["target"].style.backgroundColor = "whitesmoke";
      }

      language = node;

      node["target"].style.backgroundColor = "black";

      selected["language"] = language["target"].innerText;
      console.log(selected["language"]);
    });
  });

  nodesDifficulty.forEach((node) => {
    node.addEventListener("click", (node) => {
      if (difficulty) {
        difficulty["target"].style.backgroundColor = "whitesmoke";
      }

      difficulty = node;

      node["target"].style.backgroundColor = "black";

      selected["difficulty"] = difficulty["target"].innerText;
      console.log(selected["difficulty"]);
    });
  });

  btn.addEventListener("click", () => {



    fetch("/gameStart", {
      method: "POST",
      mode:'cors',
      body: JSON.stringify({
        "language": selected["language"],
        "difficulty": selected["difficulty"],
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch(console.error);
  });
});
