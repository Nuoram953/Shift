let noun = []

async function factory(num) {
  const value = await asyncFunction();
  for (let i = 0; i < num; i++) {
    if (value['expressions'][i].toString().includes("placeholder")) {
      value['expressions'][i] = value['expressions'][i].replace("placeholder", value['nouns'][i]);
    }
  }
  noun = value['expressions'];
  console.log(noun);
  return noun;
  
}

const asyncFunction = async () => {
  const nouns = await getNouns(10);

  const expressions = await getExpressions(10);

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
    }),
    headers: { "Content-Type": "application/json" },
  });

  const test = await response.json();
  return test;
}

export { factory };
