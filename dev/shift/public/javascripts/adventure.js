import Player from '/public/javascripts/sprites/player.js'
import Enemy from '/public/javascripts/sprites/enemy.js'
import Background from '/public/javascripts/sprites/background.js'

export let ctx = null;
export let canvas = null;
let spriteList = [];
let background = null;
let nScore = 0;

window.addEventListener("load", () =>{
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    background = new Background();    
    spriteList.push(new Player())

    console.log(spriteList);
    tick()
})


const tick = () =>{

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for(let i = 0;i<spriteList.length;i++){
        const sprite = spriteList[i];

        if (sprite.currentState == "run"){
            background.move()
            score()
        }else{
            background.still()
        }
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

