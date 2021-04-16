
import {
    canvas,
    ctx
} from '../adventure.js'
import {
    TiledImage
} from '../TiledImage.js'

export default class Entity{
    constructor() {
        this.ctx = ctx;
        this.canvas = canvas;

        this.state = {
            ATTACK: "attack",
            RUN: "run",
            IDLE: "idle",
            DEATH: "death"
        }

        this.createAnimation();

        this.animation = {
            "attack": this.animAttack,
            "run": this.animRun,
            "idle": this.animIdle
        }

       


        this.x = 150;
        this.y = 710;
        this.speed = 1;
        this.health = 3
        this.isControlable = true;

 




    }






    changeAnimation(state) {
        this.currentState = state
        this.currentAnimation = this.animation[state];
    }
}