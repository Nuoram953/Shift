import {canvas,ctx} from '../adventure.js'
import {TiledImage} from '../TiledImage.js'


export default class Player {
    constructor(){
        this.ctx = ctx;
        this.canvas = canvas;

        this.state = {
            ATTACK:"attack",
            RUN:"run",
            IDLE:"idle",
            DEATH:"death"
        }

        this.x = 50;
        this.y = 100;
        this.speed = 1;
        this.health = 3
        this.isControlable = true;

        this.currentState = this.state.RUN
        this.currentAnimation = this.changeAnimation(this.currentState);


        
        


        
        
    }

    tick() {

        if (this.currentState != this.state.ATTACK){
            this.x += this.speed;
        }

        this.currentAnimation.tick(this.x, this.y, this.ctx);


        return this.health>0;

    }

    changeAnimation(animation){

        let columnCount = null;
        let rowCount = 1;
        let refreshDelay = 100;
        let scale = 2.5;
        let loopColum = true;


        if(animation == "attack"){
            columnCount = 22
            this.attack = new TiledImage('../../images/sprite/player_attack.png', columnCount, rowCount, refreshDelay, loopColum, scale)
            this.attack.changeRow(0)
            this.attack.changeMinMaxInterval(0, columnCount)
            return this.attack
        }
        else if (animation == "run"){
            columnCount = 8
            this.run = new TiledImage('../../images/sprite/player_run.png', columnCount, rowCount, refreshDelay, loopColum, scale)
            this.run.changeRow(0)
            this.run.changeMinMaxInterval(0, columnCount)
            return this.run
        }
    }


}