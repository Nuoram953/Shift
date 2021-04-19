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

const HEIGHT = 50;
const WIDTH = 50;
const MAXHEALTH = 3;

let entities = {};
let index = 0;
let isBattleOn = false;



window.addEventListener("load", () => {

    start();

    document.addEventListener("keydown", (evt) => {

        if (evt.key == 'r'){
           entites[gameObject.PLAYER].state = state.ATTACK
        }else if (evt.key == "w"){
            gameObject[2].state = state.RUN
        }

        
    })
    tick();



})


const tick = () => {

    //console.log(currentState);
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
                entities[gameObject.ENEMY].splice(index,1)
            }else{
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
  
        if(!isBattleOn){
            battle(enemy);
            isBattleOn = true;
        }
    }
}



const start = () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    //Default element to create
    entities[gameObject.BACKGROUND] = { type: new Background(), state: state.RUN };
    entities[gameObject.UI] = { type: new UI()};
    entities[gameObject.PLAYER] = { type: new Player(), state: state.RUN };
    entities[gameObject.ENEMY]=[];



    randomEvent();


}

export const doneEvent = () => {
    

    if (gameObject['player'].state == state.ATTACK && gameObject[3].state == state.IDLE){
        gameObject['player'].state = state.IDLE;
        gameObject[3].state = state.DEATH;
        
    }else if(gameObject[3].state == state.DEATH && gameObject[2].state == state.IDLE){
        gameObject[3].type.health = 0
        battleIsOver()
        
    }else if(gameObject['player'].state == state.ATTACK){
        console.log('Condition attack');
        battleIsOver()
    }
    
    
}

const battle = (sprite) => {

    entities[gameObject.PLAYER].state = state.IDLE;
    entities[gameObject.ENEMY][entities[gameObject.ENEMY].indexOf(sprite)].state = state.IDLE; // Enemy
    entities[gameObject.BACKGROUND].state = state.IDLE;
    //spriteList[1].type.addExpressions("a",spriteList[spriteList.indexOf(sprite)].type)
}

const battleIsOver = () =>{
    gameObject[2].type.createAttack();
    gameObject[2].state = state.RUN; // Player
    gameObject[3].state = state.RUN; // Enemy
    gameObject[0].state = state.RUN; // Background
    isBattleOn = false;

    //console.log(spriteList);
}

const attack = (attacking) => {

    if (attacking == "player"){
        gameObject[2].state = state.ATTACK
    }else{
        gameObject[3].state = state.ATTACK
    }
}



const gameOver = () => {

}
