import {
    canvas,
    ctx
} from '../adventure.js'


export default class Background {
    constructor() {
        this.ctx = ctx;
        this.canvas = canvas;
        this.img = new Image();
        this.img.src = "../../images/background/Background.png"
        this.img.width = 1200;
        
        this.x = 0
        this.speed = -1;
  

    }

    changeBackground() {

    }

    move() {
        
        this.x += this.speed;
        this.x %= this.canvas.width
        
        
        
        ctx.drawImage(this.img,this.x,0,this.canvas.width,this.canvas.height)
        ctx.drawImage(this.img,this.x+this.canvas.width,0,this.canvas.width,this.canvas.height)

        

        

    }
}