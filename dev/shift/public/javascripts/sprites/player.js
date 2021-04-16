import {canvas,ctx} from '../adventure.js'
import {TiledImage} from '../TiledImage.js'
import {Enemy} from './Enemy.js'


export default class Player {
    constructor(){
        this.ctx = ctx;
        this.canvas = canvas;
        this.background = new Image();
        this.background.src = '../../images/background/Background.png'

        this.state = {
            ATTACK:"attack",
            RUN:"run",
            IDLE:"idle",
            DEATH:"death"
        }
        
        this.createAnimation();

        this.animation = {
            "attack":this.animAttack,
            "run":this.animRun,
            "idle":this.animIdle
        }

        this.changeAnimation(this.state.RUN) //Default Animation

        this.offsetX = 0
        this.x = 150;
        this.y = 175;
        this.speed = 1;
        this.health = 3
        this.isControlable = true;


        
    }

    tick() {

        
        if (this.health > 0){
            if (this.currentState == this.state.RUN){
                this.offsetX += this.speed;
                this.moveBackground(-this.offsetX)
            }

            
            



            
            this.currentAnimation.tick(this.x, this.y, this.ctx);
        }


        


        

        

        return this.health>0;

    }

    moveBackground(pos) {

        if(pos<= -300){
            this.offsetX = this.background.width;
        }
       
        ctx.drawImage(this.background,pos,175)
        ctx.drawImage(this.background,pos+canvas.width/2,175)
    }


    changeAnimation(state){
        this.currentState = state
        this.currentAnimation = this.animation[state];
    }

    createAnimation(){

        let columnCount = null;
        let rowCount = 1;
        let refreshDelay = 100;
        let scale = 2.5;
        let loopColum = true;
 
        columnCount = 22
        this.animAttack = new TiledImage('../../images/sprite/player_attack.png', columnCount, rowCount, refreshDelay, loopColum, scale)
        this.animAttack.changeRow(0)
        this.animAttack.changeMinMaxInterval(0, columnCount)
        
        columnCount = 8
        this.animRun = new TiledImage('../../images/sprite/player_run.png', columnCount, rowCount, refreshDelay, loopColum, scale)
        this.animRun.changeRow(0)
        this.animRun.changeMinMaxInterval(0, columnCount)

        columnCount = 15
        this.animIdle = new TiledImage('../../images/sprite/player_idle.png', columnCount, rowCount, refreshDelay, loopColum, scale)
        this.animIdle.changeRow(0)
        this.animIdle.changeMinMaxInterval(0, columnCount)
            
        
    }


}