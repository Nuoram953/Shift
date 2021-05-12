
import {
    canvas,
    ctx
} from '../adventure.js'
import {
    TiledImage
} from '../TiledImage.js'

import { state } from '../adventure.js'

export default class Entity {
    constructor() {
        this.canvas = canvas;
        this.state = state;
        this.currentState = state.RUN;
        this.currentAnimation = null;

        


        this.createAnimation();

        
        this.animation = {
            "attack": this.animAttack,
            "run": this.animRun,
            "idle": this.animIdle,
            "death":this.animDeath
        }

        this.x = 150;
        this.y = 710;
        this.speed = 1;
        this.health = 3;
        this.maxHealth = this.health;
        this.isControlable = true;
    }


    changeAnimation(state) {
        this.currentState = state
        this.currentAnimation = this.animation[state];
    }

    attack(){
        this.currentState = this.state.ATTACK
        this.currentAnimation = this.animation[this.currentState]
    }

    run(){
        this.currentState = this.state.RUN
        this.currentAnimation = this.animation[this.currentState]
    }

    idle(){
        this.currentState = this.state.RUN
        this.currentAnimation = this.animation[this.currentState]
    }
    
}