let noun = []

async function factory(num, canvas, ctx) {
  const value = await asyncFunction(num);

  let words = [];
  noun = value['expressions'];
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

const asyncFunction = async (num) => {
  const nouns = await getNouns(num);

  const expressions = await getExpressions(num);

  let temp = {
    nouns: nouns,
    expressions: expressions,
  };

  return temp;
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

  const test = await response.json();
  return test;
}

async function getExpressions(num) {




  const response = await fetch("/game/Expression", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      quantity: num,
      difficulty: document.getElementById('difficulty').innerHTML.toString().trim()
    }),
    headers: {
      "Content-Type": "application/json"
    },
  });

  const test = await response.json();
  return test;
}

const prep = (word, width, ctx, nouns) => {
  let x = (width / 2) - caclPX(word, ctx) / 2;
  let test = [];

  while (word.toString().includes("placeholder")) {
    word = word.replace("placeholder", nouns[Math.floor(Math.random() * nouns.length)]);
  }

  for (let char in word) {
    test.push({
      color: "black",
      position: x,
      char: word[char]
    })
    x += 25;
  }
  return test
}


//11,4,3,6 - trop sur la gauche
const caclPX = (word, ctx) => {
  let distance = 0;
  let whitespace = (word.length / 2) * 0.98;


  distance += whitespace
  for (let index = 0; index < word.length; index++) {
    distance += ctx.measureText(word[index]).width;
    distance += whitespace

  }
  return distance
}

export {
  factory
};