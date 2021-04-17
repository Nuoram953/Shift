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
        this.x = canvas.width + 10;
        this.speed = 1
        this.y = 670;
        this.isMoving = true
        this.changeAnimation(this.state.RUN)
        
    }

    tick() {



        if (this.health > 0) {
            if (this.currentState == this.state.RUN && this.isMoving) {
                this.x -= this.speed
               
            }

            this.currentAnimation.tick(this.x, this.y, this.ctx);
        }

        return this.health > 0;
    }

    mouvement(){
        if(this.isMoving){
            this.isMoving = false;
        }
        else{
            this.isMoving = true;
        }
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
        this.animAttack.setFlipped(false)

        columnCount = 8
        this.animRun = new TiledImage('../../images/sprite/Boss/spr_Walk_strip.png', columnCount, rowCount, refreshDelay, loopColum, scale)
        this.animRun.changeRow(0)
        this.animRun.changeMinMaxInterval(0, columnCount)
        this.animRun.setFlipped(true)

        columnCount = 16
        this.animIdle = new TiledImage('../../images/sprite/Boss/spr_Idle_strip.png', columnCount, rowCount, refreshDelay, loopColum, scale)
        this.animIdle.changeRow(0)
        this.animIdle.changeMinMaxInterval(0, columnCount)


    }
}