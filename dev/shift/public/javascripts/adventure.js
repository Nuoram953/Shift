/*******************************************************************
*NAME: ANTOINE AUGER-MAROUN
*DATE: 2021-05-13 11:14:49
*OBJECT: Manage adventure game. Main file. Everything is compile into main.js with webpack
*FICHIER: adventure.js
/*******************************************************************/


import Player from '/public/javascripts/sprites/player.js'
import Enemy from '/public/javascripts/sprites/enemy.js'
import Background from '/public/javascripts/sprites/background.js'
import UI from '/public/javascripts/sprites/ui.js'
import Prop from './sprites/prop';

export let ctx = null;
export let canvas = null;
export let player = null;

export let state = {
    ATTACK: "attack",
    RUN: "run",
    IDLE: "idle",
    DEATH: "death"
}

let gameObject = {
    UI: 'ui',
    BACKGROUND: 'background',
    PLAYER: 'player',
    ENEMY: 'enemy',
    PROP: 'prop'
}

let game = {
    score: 0,
    words: [],
    type: "adventure",
    time: Date.now(),
    cpm: null,
    languages: null,
    difficulty: null,
    stats: null,
}

let entities = {};
let isBattleOn = false;
let isPropOn = false;
let start = false;
let canInput = true;
let isOver = false;
let lastInput = null;

let audio = new Audio('/sounds/adventure.mp3')
audio.volume = 0.1;



window.addEventListener("load", () => {

    let msgStart = "Appuyez sur ENTER pour commencer";

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";
    ctx.font = "55px Arial";
    ctx.fillText(msgStart, (canvas.width / 2) - ctx.measureText(msgStart).width / 2, canvas.height / 2, canvas.width, canvas.height);

    document.addEventListener("keydown", (evt) => {

        if (!start && evt.key == "Enter") {
            start = true
            init();
            tick()

        } else {

            if (canInput) {
                let answer = entities[gameObject.UI].type.checkInput(evt.key);

                lastInput = Date.now();

                if (answer != undefined) {
                    if (!answer) {
                        entities[gameObject.ENEMY][0].state = state.ATTACK;
                        canInput = false;
                    }

                    if (entities[gameObject.UI].type.expressions.length <= 0) {
                        entities[gameObject.PLAYER].state = state.ATTACK;
                        canInput = false;
                    }
                }
            }
        }

    })
})



const tick = () => {

    if (!isOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

       
        if(Date.now()- lastInput >= 6000 && lastInput){
            lastInput = Date.now();
            entities[gameObject.ENEMY][0].state = state.ATTACK
            entities[gameObject.ENEMY][0].type.createAttack()
        }
        




        entities[gameObject.BACKGROUND].type.changeAnimation(entities[gameObject.BACKGROUND].state)
        entities[gameObject.BACKGROUND].type.tick();

        entities[gameObject.UI].type.playerHealth = entities[gameObject.PLAYER].type.health
        entities[gameObject.UI].type.tick();

        entities[gameObject.PLAYER].type.changeAnimation(entities[gameObject.PLAYER].state)
        if (!entities[gameObject.PLAYER].type.tick()) {
            gameOver();
        }

        entities[gameObject.ENEMY].forEach((enemy) => {
            enemy.type.changeAnimation(enemy.state)

            if (!enemy.type.tick()) {
                let index = entities[gameObject.ENEMY].indexOf(enemy)
                entities[gameObject.ENEMY].splice(index, 1)
            } else {
                checkForEnemyNear(enemy)
            }
        })

        entities[gameObject.PROP].forEach((prop) => {
            prop.type.changeAnimation(prop.state)
            let alive = prop.type.tick();

            if (!alive) {
                entities[gameObject.PROP].splice(0, 1)
                isPropOn = false
            } else {
                checkForPropNear(prop)
            }
        })
        window.requestAnimationFrame(tick)
    }

}



const randomEvent = () => {

    let eventState = state.RUN;

    if (isBattleOn || isPropOn) {
        eventState = state.IDLE;

    } else {

        if (Math.floor(Math.random() * 10) < 3) {
            entities[gameObject.PROP].push({ type: new Prop(), state: eventState })
            
        } else {
            entities[gameObject.ENEMY].push({ type: new Enemy(), state: eventState })
        }

    }

    setTimeout(randomEvent, 5000)
}



const checkForEnemyNear = (enemy) => {
    if (entities[gameObject.PLAYER].type.x + 300 >= enemy.type.x) {

        if (!isBattleOn) {
            battle(enemy);
            isBattleOn = true;
        }
    }
}



const checkForPropNear = (prop) => {
    if (entities[gameObject.PLAYER].type.x + 50 >= prop.type.x) {

        if (!isPropOn) {
            isPropOn = true;

            globalState(state.IDLE)

            entities[gameObject.UI].type.prop = prop.type
            entities[gameObject.UI].type.health(true)

            setTimeout(() => {
                globalState(state.RUN)

            }, 1000);
        }
    }
}



const init = () => {

    canInput = false;

    audio.play()

    //Default element to create
    entities[gameObject.BACKGROUND] = { type: new Background(), state: state.RUN };
    entities[gameObject.UI] = { type: new UI() };
    entities[gameObject.PLAYER] = { type: new Player(), state: state.RUN };
    entities[gameObject.ENEMY] = [];
    entities[gameObject.PROP] = [];

    player = entities[gameObject.PLAYER]

    randomEvent();
}

export const doneEvent = () => {

    //If player win
    if (entities[gameObject.PLAYER].state == state.ATTACK && entities[gameObject.ENEMY][0].state == state.IDLE) {
        entities[gameObject.PLAYER].state = state.IDLE;
        entities[gameObject.ENEMY][0].state = state.DEATH;

    }

    // After enemy death
    else if (entities[gameObject.PLAYER].state == state.IDLE && entities[gameObject.ENEMY][0].state == state.DEATH) {
        entities[gameObject.ENEMY][0].type.health = 0
        isBattleOn = false;
        battleIsOver()

    }

    // If player make a mistake
    else if (entities[gameObject.PLAYER].state == state.IDLE && entities[gameObject.ENEMY][0].state == state.ATTACK) {
        entities[gameObject.PLAYER].type.health--;
        entities[gameObject.ENEMY][0].state = state.IDLE;
        entities[gameObject.ENEMY][0].type.createAttack()
    }

    canInput = true;


}

const battle = (sprite) => {
    canInput = true;
    lastInput = Date.now()
    game['words'].push({ word: [], start: Date.now(), end: null, cpm: null })
    globalState(state.IDLE)
    entities[gameObject.UI].type.enemy = sprite.type
    entities[gameObject.UI].type.findWord()

}

const battleIsOver = () => {
    lastInput = null;
    entities[gameObject.PLAYER].type.createAttack()
    entities[gameObject.UI].type.points(5);

    let idx = game['words'].length - 1

    game['words'][idx]['word'] = entities[gameObject.UI].type.getWord();
    game['words'][idx]['end'] = Date.now();
    game['score'] = entities[gameObject.UI].type.score;

    entities[gameObject.UI].type.setWord();
    globalState(state.RUN)

}

const globalState = (state) => {
    entities[gameObject.PLAYER].state = state;

    entities[gameObject.BACKGROUND].state = state;


    entities[gameObject.ENEMY].forEach(enemy => {
        enemy.state = state
    })
    entities[gameObject.PROP].forEach(prop => {
        prop.state = state
    })
}

const calculateCPM = () => {
    console.log('To be implemented');
}

const calculateStats = () => {

    let stats = { good: 0, corrected: 0, wrong: 0 }

    if (game['words'].length > 0) {
        game['words'].forEach((word) => {

            word['word'].forEach((letter) => {
                if (letter['color'] == "green") {
                    stats['good'] += 1;
                }
                else if (letter['color'] == "red") {
                    stats['wrong'] += 1;
                }
                else {
                    stats['corrected'] += 1;
                }
            })


        })
    }

    return stats

}


const gameOver = () => {

    game['words'].pop(); // If the game end, the player didn't complete the current word so we remove it

    isOver = true;
    fetch("/game/result", {
        method: "POST",
        body: JSON.stringify({
            date: game['time'],
            words: game['words'],
            cpm: 15,
            type: "adventure",
            score: game['score'],
            stats: calculateStats()
        }),
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "manual"
    }).then((response) => response.json())
        .then((data) => {
            window.location.replace(data['url'])
        })
        .catch(console.error);



}


