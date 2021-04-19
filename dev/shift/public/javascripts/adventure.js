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

const HEIGHT = 50;
const WIDTH = 50;
const MAXHEALTH = 3;

let spriteList = [];
let index = 0;
let isBattleOn = false;



window.addEventListener("load", () => {

    start();

    document.addEventListener("keydown", (evt) => {

        if (evt.key == 'r'){
            spriteList[2].state = state.ATTACK
        }else if (evt.key == "w"){
            spriteList[2].state = state.RUN
        }

        console.log(spriteList[2].state);
    })
    tick();



})


const tick = () => {

    //console.log(currentState);
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    spriteList.forEach(sprite => {

        let current = spriteList.indexOf(sprite)

        if (sprite.type instanceof UI) {
            sprite.type.playerHealth = spriteList[2].type.health
            sprite.type.tick()

        } else if (sprite.type instanceof Background) {
            sprite.type.changeAnimation(sprite.state)
            sprite.type.tick()

        } else {

            sprite.type.changeAnimation(sprite.state)
            let alive = sprite.type.tick()

            if (!(sprite.type instanceof Player)) {
                checkForEnemyNear(spriteList[current])
            }

            if (!alive) {
                let index = spriteList.indexOf(sprite);
                spriteList.splice(index, 1);
            }
        }
    })

    window.requestAnimationFrame(tick)
}



const randomEvent = () => {

    if (spriteList.length < 6 && !isBattleOn) {
        spriteList.push({ type: new Enemy(), state: state.RUN })
    }

    setTimeout(randomEvent, 10000)
}

const checkForEnemyNear = (sprite) => {
    if (spriteList[2].type.x + 300 >= sprite.type.x) {

       
        if(!isBattleOn){
            battle(sprite);
            isBattleOn = true;
        }
    }
}



const start = () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    //Default element to create
    spriteList.push({ type: new Background(), state: state.RUN })
    spriteList.push({ type: new UI() })
    spriteList.push({ type: new Player(), state: state.RUN })



    randomEvent();


}

export const doneEvent = () => {

    if (spriteList[2].state == state.ATTACK && spriteList[3].state == state.IDLE){
        spriteList[2].state = state.IDLE;
        spriteList[3].state = state.DEATH;
        
    }else if(spriteList[3].state == state.DEATH && spriteList[2].state == state.IDLE){
        spriteList[3].type.health = 0
        battleIsOver()
        
    }
    

    
}

const battle = (sprite) => {

    spriteList[2].state = state.IDLE; // Player
    spriteList[spriteList.indexOf(sprite)].state = state.IDLE; // Enemy
    spriteList[0].state = state.IDLE;
    //spriteList[1].type.addExpressions("a",spriteList[spriteList.indexOf(sprite)].type)
}

const battleIsOver = () =>{
    console.log('test');
    spriteList[2].state = state.RUN; // Player
    spriteList[3].state = state.RUN; // Enemy
    spriteList[0].state = state.RUN; // Background

    //console.log(spriteList);
}

const attack = (attacking) => {

    if (attacking == "player"){
        spriteList[2].state = state.ATTACK
    }else{
        spriteList[3].state = state.ATTACK
    }
}
