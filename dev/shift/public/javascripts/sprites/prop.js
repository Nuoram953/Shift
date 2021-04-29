/*******************************************************************
*NAME: ANTOINE AUGER-MAROUN
*DATE: 26/04/2021
*OBJECT: Manage all prop event in game. It is randomly chose when the instance is created
*FICHIER: prop.js
/*******************************************************************/
import {
    canvas,
    ctx
} from '../adventure.js'
import {
    TiledImage
} from '../TiledImage.js'
import Entity from './entity.js'


let type = {
    1: "firePlace",
    2: "torch"
}


export default class Prop extends Entity {
    constructor() {
        super()
        this.ctx = ctx
        this.x = canvas.width + 10
        this.y = 670 
        this.speed = 2
        this.createAnimation(Math.ceil(Math.random() * Object.keys(type).length))
    }


    tick() {
        if(this.currentState == this.state.RUN){
            this.x -= this.speed;
        }
        this.animation.tick(this.x, this.y, this.ctx);

        if (this.x < 0) return false;
           
        return true;
    }

    createAnimation(index) {

        let columnCount = null;
        let rowCount = 1;
        let refreshDelay = 100;
        let scale = 1.5;
        let loopColum = true;

        console.log(index);

        switch (index) {
            case 1:
                columnCount = 6
                this.animation = new TiledImage(`../../images/sprite/Props/${type[index]}.png`, columnCount, rowCount, refreshDelay, loopColum, scale)
                this.animation.setLooped(true)
                this.animation.changeRow(0)
                this.animation.changeMinMaxInterval(0, columnCount)
                break;

            case 2:
                columnCount = 6
                this.animation = new TiledImage(`../../images/sprite/Props/${type[index]}.png`, columnCount, rowCount, refreshDelay, loopColum, scale)
                this.animation.setLooped(true)
                this.animation.changeRow(0)
                this.animation.changeMinMaxInterval(0, columnCount)
                break;


            default:
                break;
        }
    }





}