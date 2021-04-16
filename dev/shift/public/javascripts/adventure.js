import Player from '/public/javascripts/sprites/player.js'
import Enemy from '/public/javascripts/sprites/enemy.js'
import Background from '/public/javascripts/sprites/background.js'

export let ctx = null;
export let canvas = null;

let spriteList = [];
let background = null;
let nScore = 0;
let currentState = "run"; // default state

window.addEventListener("load", () =>{
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    background = new Background();    
    spriteList.push(new Player())
    tick();
    randomEvent();
})


const tick = () =>{

    //We check for state -> global state. If player is run then all entities should run 
    // If run -> background should move
    //else -> background still

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (currentState == "run"){
        background.move();
    }else{
        background.idle();
    }

    for(let i = 0;i<spriteList.length;i++){
        const sprite = spriteList[i]
        sprite.changeAnimation(currentState);
        let alive = sprite.tick();


        if(!alive){
            spriteList.splice(i,1);
            i--;
        }
    }
    


    
    

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

