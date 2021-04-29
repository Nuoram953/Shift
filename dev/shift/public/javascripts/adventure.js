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


let entities = {};
let isBattleOn = false;
let isPropOn = false;
let start = false;
let canInput = true;



window.addEventListener("load", () => {

    let sStart = "Appuyez sur ENTER pour commencer";

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";
    ctx.font = "55px Arial";
    ctx.fillText(sStart, (canvas.width / 2) - ctx.measureText(sStart).width / 2, canvas.height / 2, canvas.width, canvas.height);

    document.addEventListener("keydown", (evt) => {

        if (!start && evt.key == "Enter") {
            start = true
            init();
            tick()

        } else {

            if (canInput) {
                let answer = entities[gameObject.UI].type.checkInput(evt.key);

                if (answer != undefined) {
                    if (!answer) {
                        entities[gameObject.ENEMY][0].state = state.ATTACK;
                        canInput = false;
                    }

                    if (entities[gameObject.UI].type.expressions.length <= 0) {
                        entities[gameObject.PLAYER].state = state.ATTACK;
                        //TODO:Reset animation attack of enemy
                        canInput = false;
                    }
                }
            }
        }

    })
})


const tick = () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height)

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



const randomEvent = () => {

    let eventState = state.RUN;

    if (isBattleOn || isPropOn) {
        eventState = state.IDLE;
    }else{
        switch (Math.floor(Math.random() * 2)) {
            case 0: entities[gameObject.ENEMY].push({ type: new Enemy(), state: eventState })
                break;
            case 1: entities[gameObject.PROP].push({ type: new Prop(), state: eventState })
                break;
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

    //Default element to create
    entities[gameObject.BACKGROUND] = { type: new Background(), state: state.RUN };
    entities[gameObject.UI] = { type: new UI() };
    entities[gameObject.PLAYER] = { type: new Player(), state: state.RUN };
    entities[gameObject.ENEMY] = [];
    entities[gameObject.PROP] = [];



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
        entities[gameObject.PLAYER].type.health -= 0.5;
        entities[gameObject.ENEMY][0].state = state.IDLE;
        entities[gameObject.ENEMY][0].type.createAttack()
    }

    canInput = true;


}

const battle = (sprite) => {

    canInput = true;

    globalState(state.IDLE)
    entities[gameObject.UI].type.enemy = sprite.type
    entities[gameObject.UI].type.findWord()
   
}

const battleIsOver = () => {
    entities[gameObject.PLAYER].type.createAttack()
    entities[gameObject.UI].type.points(5);

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




const gameOver = () => {
    console.log('');
}
