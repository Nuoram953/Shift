/*******************************************************************
*NAME: ANTOINE AUGER-MAROUN
*DATE: 12/04/2021
*OBJECT: Ask for expressions and nouns to server. It also prepares them for game.js
*FICHIER: factory.js
/*******************************************************************/


async function factory(nExpression, nNoun, canvas, ctx, type) {
  const value = await asyncFunction(nExpression, nNoun, type);

  let words = [];
  let noun = value['expressions'];
  for (let word in noun) {
    words.push({
      word: prep(noun[word], canvas.width, ctx, value['nouns']),
      start: null,
      end: null,
      cpm: null
    });
  }
  return words;

}


/**
 * Ask the server for the expressions and nouns
 * @param {int} num -> The number of word needed
 * @returns {dict}
 */
const asyncFunction = async (num1, num2, type) => {


  let data = {
    nouns: null,
    expressions: null,
  };

  data['nouns'] = await getNouns(num2);

  switch (type) {
    case "normal": data['expressions'] = await getExpressions(num1);
      break;
    case "adventure": data['expressions'] = await getExpressionsAdventure();
      break;
  }

  console.log(data);

  return data;
};

async function getNouns(num) {
  const response = await fetch("/game/Noun", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      quantity: num,
    }),
    headers: {
      "Content-Type": "application/json"
    },
  });

  const data = await response.json();
  return data;
}

async function getExpressions(num) {
  const response = await fetch("/game/Expression", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      quantity: num,
      difficulty: document.getElementById('difficulty').innerHTML.toString().trim(),
      language: document.getElementById('language').innerHTML.toString().trim()
    }),
    headers: {
      "Content-Type": "application/json"
    },
  });

  const data = await response.json();
  return data;
}

async function getExpressionsAdventure() {
  const response = await fetch("/adventure/Expression", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
  });

  const data = await response.json();
  return data
}


/**
 * Creates a dictionary for each letter. It conains the color, the position and the letter itself.
 * The color gives us the state of the letter (if it's the corrected one when it's green etc...)
 * Also remove placeholder in word and replace it with a random noun
 * @param {string} word -> Current expression
 * @param {int} width -> Width of the canvas
 * @param {*} ctx -> Context of the canvas
 * @param {array} nouns -> Array of 10 words picked randomly from MongoDB
 * @returns {dict} -> An array of dict that contains the info needed for each letter in the word
 */
const prep = (word, width, ctx, nouns) => {
  let x = (width / 2) - caclPX(word, ctx) / 2;
  let letter = [];

  while (word.toString().includes("placeholder")) {
    word = word.replace("placeholder", nouns[Math.floor(Math.random() * nouns.length)]);
  }

  for (let char in word) {
    letter.push({
      color: "black",
      position: x,
      char: word[char]
    })
    x += 30;
  }
  return letter
}


/**
 * Since can't individually select a letter within the canvas, we calculate the position for each letter individually and added manually whitespaces
 * @param {string} word -> Current expression
 * @param {*} ctx -> Context of the canvas
 * @returns {int} -> Width of a word and the whitespaces in px.
 */
const caclPX = (word, ctx) => {
  let distance = 0;
  ctx.font = "30px Arial";

  console.log(`${word}---->length: ${word.length}`);

  if (word.length > 3) {
    distance += 30
  }
  for (let index = 0; index < word.length; index++) {

    distance += ctx.measureText(word[index]).width;


  }

  return distance
}

export {
  factory
};