import Player from '/public/javascripts/sprites/player.js'
import Enemy from '/public/javascripts/sprites/enemy.js'
import Background from '/public/javascripts/sprites/background.js'


export let ctx = null;
export let canvas = null;

export let state = {
    ATTACK: "attack",
    RUN: "run",
    IDLE: "idle",
    DEATH: "death"
}

const HEIGHT = 50;
const WIDTH = 50;

let spriteList = [];
let background = null;
let nScore = 0;
let currentState = state.RUN; // default state
let isCurrentEnemy = true;
let index = 0;
let currentEnemy = null;
let expressions = []

window.addEventListener("load", () =>{
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    background = new Background(state.RUN);    
    spriteList.push(new Player())

    randomEvent();

    document.addEventListener("keydown",(evt)=>{

        if (evt.key == expressions[index].alt){
           expressions.splice(index, 1);
        }


        if (evt.key == "w"){
            if (currentState == state.RUN){
                currentState = state.IDLE;
            }else{
                currentState = state.RUN;
            }
        }else if(evt.key == "r"){

            
        }
    })
    tick();
    


})


const tick = () =>{


    ctx.clearRect(0, 0, canvas.width, canvas.height)

    background.tick(currentState)

    for(let i = 0;i<spriteList.length;i++){
        const sprite = spriteList[i];
        let alive = sprite.tick(currentState);

        if(i != 0){
            checkForEnemyNear(sprite);
        }

        if(!alive){
            spriteList.splice(i,1);
            i--;
        }


        for(let i = 0;i<expressions.length; i++){
            ctx.drawImage(expressions[i],currentEnemy.x+i*WIDTH,currentEnemy.y-65,expressions[i].width,expressions[i].height)
        }


    }

    score();

    window.requestAnimationFrame(tick)
}

const score = () => {
    if (currentState == state.RUN){
        nScore++;
    }
    ctx.font = "55px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(nScore,(canvas.width/2)-(ctx.measureText(nScore).width/2),100);
}

const randomEvent = () => {

    if (currentState == state.RUN && spriteList.length < 3){
        spriteList.push(new Enemy())
    }

    setTimeout(randomEvent, 10000)
}

const checkForEnemyNear = (sprite) => {
    let player = spriteList[0];
    
    if (player.x + 300 >= sprite.x){
        currentState = state.IDLE
        if(isCurrentEnemy){
            currentEnemy = sprite;
            addExpressions("a");
            isCurrentEnemy = false;
        }
    }
    

}

const addExpressions = (sprite) => {
    let key = new Image(WIDTH,HEIGHT);
    key.src = '../../images/keyboard/a.png'
    key.alt = "a";
    expressions.push(key)

    let key2 = new Image(WIDTH,HEIGHT);
    key2.src = '../../images/keyboard/b.png'
    key2.alt = "b";
    expressions.push(key2)

    let key3 = new Image(WIDTH,HEIGHT);
    key3.src = '../../images/keyboard/c.png'
    key3.alt = "c";
    expressions.push(key3)
}

