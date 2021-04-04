let noun = []

async function factory(num,canvas,ctx) {
  const value = await asyncFunction(num);
  for (let i = 0; i < num; i++) {
    if (value['expressions'][i].toString().includes("placeholder")) {
      value['expressions'][i] = value['expressions'][i].replace("placeholder", value['nouns'][i]);
    }
  }
  let words = [];
  noun = value['expressions'];
  for (let word in noun) {
    words.push({word:prep(noun[word],canvas.width,ctx),start:null,end:null,cpm:null});
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
    headers: { "Content-Type": "application/json" },
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
      difficulty:document.getElementById('difficulty').innerHTML.toString().trim()
    }),
    headers: { "Content-Type": "application/json" },
  });

  const test = await response.json();
  return test;
}

const prep = (word,width,ctx) => {
  let x = (width / 2) - caclPX(word,ctx);
  let test = [];

  for (let char in word) {
      test.push({ color: "black", position: x, char: word[char] })
      x += 25;
  }
  return test
}

const caclPX = (word,ctx) => {
  let distance = 0;
  for (let index = 0; index < word.length; index++) {
      distance += ctx.measureText(word[index]).width;

  }
  return distance
}

export { factory };
