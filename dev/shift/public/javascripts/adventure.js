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
let background = null;
let ui = null
let currentState = state.RUN; // default state
let isCurrentEnemy = true;
let index = 0;
let currentEnemy = null;
let imgHealth = null;

window.addEventListener("load", () =>{

    start();

    document.addEventListener("keydown",(evt)=>{

        if (evt.key == expressions[index].alt){
           expressions.splice(index, 1);
           if (expressions == 0){
                spriteList[0].changeAnimation(state.ATTACK)
               spriteList.splice(1,1)
               changeAnimation(state.RUN);
               isCurrentEnemy = true;

           }
        }else{
            console.log('test');
            
        }

    })
    tick();
    


})


const tick = () =>{

    //console.log(currentState);
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    spriteList.forEach(sprite =>{



        if (sprite.type instanceof UI){
            sprite.type.playerHealth = spriteList[2].type.health
            sprite.type.tick()
        }else if (sprite.type instanceof Background){
            sprite.type.changeAnimation(sprite.state)
            sprite.type.tick()
        }else{
            sprite.type.changeAnimation(sprite.state)
            let alive = sprite.type.tick()
            if(!alive){
                let index = spriteList.indexOf(sprite);
                spriteList.splice(index,1);
            }
        }




        if(!sprite.type instanceof Player && !sprite.type instanceof UI && !sprite.type instanceof Background){
            checkForEnemyNear(sprite.type)
        }




    })

    window.requestAnimationFrame(tick)
}



const randomEvent = () => {

    if (currentState == state.RUN && spriteList.length < 3){
        spriteList.push(new Enemy())
    }

    setTimeout(randomEvent, 10000)
}

const checkForEnemyNear = (sprite) => {
   
    if (player.x + 300 >= sprite.x){
        changeAnimation(state.IDLE)
        if(isCurrentEnemy){
            ui.addExpressions("a",sprite);
            isCurrentEnemy = false;
        }
    }
    

}


const changeAnimation = (state) => {
    currentState = state;
    background.currentState = state;
    spriteList.forEach((sprite)=>{
        sprite.currentState = state
    });
}


const start = () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    spriteList.push({type:new Background(),state:state.RUN})
    spriteList.push({type:new UI()})
    spriteList.push({type:new Player(),state:state.ATTACK})



    //randomEvent();
    

}

export const doneEvent = () => {
    spriteList[2].state = state.RUN;
}
