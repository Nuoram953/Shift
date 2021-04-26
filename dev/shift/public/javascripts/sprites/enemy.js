import {
    canvas,
    ctx,
    doneEvent
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
        this.speed = 1
        this.y = 670;
        this.isMoving = true
        

        
    }

    tick() {

        
        if (this.health > 0) {
            if (this.currentState == this.state.RUN) {
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

        columnCount = 30
        this.animAttack = new TiledImage('../../images/sprite/Boss/spr_Attack_strip.png', columnCount, rowCount, refreshDelay, loopColum, scale)
        this.animAttack.setFlipped(true)
        this.animAttack.setLooped(false)
        this.animAttack.changeRow(0)
        this.animAttack.changeMinMaxInterval(0, columnCount, doneEvent)
        
        
        
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

        columnCount = 40
        this.animDeath = new TiledImage('../../images/sprite/Boss/spr_Death_strip.png', columnCount, rowCount, refreshDelay, loopColum, scale)
        this.animDeath.setFlipped(true);
        this.animDeath.setLooped(false)
        this.animDeath.changeRow(0)
        this.animDeath.changeMinMaxInterval(0, columnCount, doneEvent)
        


    }
}