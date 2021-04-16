import Player from '/public/javascripts/sprites/player.js'
import {Enemy} from '/public/javascripts/sprites/enemy.js'

export let ctx = null;
export let canvas = null;
let spriteList = [];

window.addEventListener("load", () =>{
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    spriteList.push(new Player())

    console.log(spriteList);
    tick()
})


const tick = () =>{

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for(let i = 0;i<spriteList.length;i++){
        const sprite = spriteList[i];
        let alive = sprite.tick();

        if(!alive){
            spriteList.splice(i,1);
            i--;
        }
    }

    window.requestAnimationFrame(tick)
}