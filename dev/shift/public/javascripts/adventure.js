import Player from '/public/javascripts/sprites/player.js'
import Background from '/public/javascripts/sprites/background.js'

export let ctx = null;
export let canvas = null;
let spriteList = [];
let background = null;

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
        background.move()
        let alive = sprite.tick();

        if(!alive){
            spriteList.splice(i,1);
            i--;
        }
    }

    window.requestAnimationFrame(tick)
}