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

let spriteList = [];
let background = null;
let nScore = 0;
let currentState = state.RUN; // default state

window.addEventListener("load", () =>{
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    background = new Background(state.RUN);    
    spriteList.push(new Player())

    document.addEventListener("keydown",(evt)=>{
        if (evt.key == "w"){
            if (currentState == state.RUN){
                currentState = state.IDLE;
            }else{
                currentState = state.RUN;
            }
        }
    })
    tick();
    // randomEvent();


})


const tick = () =>{

    //We check for state -> global state. If player is run then all entities should run 
    // If run -> background should move
    //else -> background still

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    background.tick(currentState)

    for(let i = 0;i<spriteList.length;i++){
        const sprite = spriteList[i];
        let alive = sprite.tick(currentState);
    }


    // for(let i = 0;i<spriteList.length;i++){
    //     const sprite = spriteList[i]
    //     let alive = sprite.tick();


    //     if(!alive){
    //         spriteList.splice(i,1);
    //         i--;
    //     }
    // }

    // if (spriteList.length > 1){
    //     if (spriteList[0].x + 300 >= spriteList[1].x){
    //         background.currentState == state.IDLE;
    //         spriteList.forEach(sprite => {
    //             sprite.changeAnimation(state.IDLE);
    //         })
    //     }
    // }


    


    
    

    window.requestAnimationFrame(tick)
}

const score = () => {
    nScore++;
    ctx.font = "55px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(nScore,(canvas.width/2)-(ctx.measureText(nScore).width/2),100);
}

const randomEvent = () => {

    spriteList.push(new Enemy())

    setTimeout(randomEvent, 10000)
}

