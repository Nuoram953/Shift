import Player from '/public/javascripts/sprites/player.js'
import Enemy from '/public/javascripts/sprites/enemy.js'
import Background from '/public/javascripts/sprites/background.js'
import UI from '/public/javascripts/sprites/ui.js'


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
    ENEMY: 'enemy'
}


let entities = {};
let isBattleOn = false;
let start = false;
let canInput = true;



window.addEventListener("load", () => {

    let sStart = "Appuyez sur ENTER pour commencer";

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";
    ctx.font = "55px Arial";
    ctx.fillText(sStart,(canvas.width/2)-ctx.measureText(sStart).width/2,canvas.height/2,canvas.width,canvas.height);

    document.addEventListener("keydown", (evt) => {

        if(!start && evt.key == "Enter"){ 
            start = true
            init();
            tick()

        }else{
            
            if(canInput){
                let answer = entities[gameObject.UI].type.checkInput(evt.key);
 
                if(answer != undefined){
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
    window.requestAnimationFrame(tick)
}



const randomEvent = () => {

    if (entities[gameObject.ENEMY].length < 6 && !isBattleOn) {
        entities[gameObject.ENEMY].push({ type: new Enemy(), state: state.RUN })
    }

    setTimeout(randomEvent, 10000)
}

const checkForEnemyNear = (enemy) => {
    if (entities[gameObject.PLAYER].type.x + 300 >= enemy.type.x) {

        if (!isBattleOn) {
            battle(enemy);
            isBattleOn = true;
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

    entities[gameObject.PLAYER].state = state.IDLE;
    entities[gameObject.ENEMY][entities[gameObject.ENEMY].indexOf(sprite)].state = state.IDLE; // Enemy
    entities[gameObject.BACKGROUND].state = state.IDLE;
    entities[gameObject.UI].type.enemy = sprite.type
    entities[gameObject.UI].type.findWord()
}

const battleIsOver = () => {
    entities[gameObject.PLAYER].type.createAttack()
    entities[gameObject.PLAYER].state = state.RUN;
    entities[gameObject.ENEMY][0].state = state.RUN;
    entities[gameObject.BACKGROUND].state = state.RUN;
    entities[gameObject.UI].type.points(5);
}



const gameOver = () => {
    console.log('');
}
