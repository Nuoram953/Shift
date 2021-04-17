import {
    canvas,
    ctx
} from '../adventure.js'
import {
    TiledImage
} from '../TiledImage.js'
import Entity from './entity.js'



export default class Enemy extends Entity{
    constructor(){
        super();

        this.canvas = canvas
        this.ctx = ctx;
        
        this.x = this.canvas.width + 10;
        this.speed = 3
        this.y = 670;
        this.isMoving = true
        this.keys = [];
        this.changeAnimation(this.state.RUN)

        
    }

    tick(state) {
        if (state != this.currentState){
            this.changeAnimation(state);
        }
        
        if (this.health > 0) {
            if (state == this.state.RUN) {
                this.x -= this.speed; 
            }
            this.currentAnimation.tick(this.x, this.y, this.ctx);
        }
        


        return this.health > 0;
    }



    createAnimation() {

        let columnCount = null;
        let rowCount = 1;
        let refreshDelay = 100;
        let scale = 2.5;
        let loopColum = true;

        columnCount = 16
        this.animAttack = new TiledImage('../../images/sprite/Boss/spr_Idle_strip.png', columnCount, rowCount, refreshDelay, loopColum, scale)
        this.animAttack.changeRow(0)
        this.animAttack.changeMinMaxInterval(0, columnCount)
        
        
        columnCount = 8
        this.animRun = new TiledImage('../../images/sprite/Boss/spr_Walk_strip.png', columnCount, rowCount, refreshDelay, loopColum, scale)
        this.animRun.setFlipped(true);
        this.animRun.changeRow(0)
        this.animRun.changeMinMaxInterval(0, columnCount)
        
        
        columnCount = 16
        this.animIdle = new TiledImage('../../images/sprite/Boss/spr_Idle_strip.png', columnCount, rowCount, refreshDelay, loopColum, scale)
        this.animIdle.setFlipped(true);
        this.animIdle.changeRow(0)
        this.animIdle.changeMinMaxInterval(0, columnCount)
        


    }
}