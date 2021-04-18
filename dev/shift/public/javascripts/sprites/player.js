import {
    canvas,
    ctx,
    doneEvent
} from '../adventure.js'
import {
    TiledImage
} from '../TiledImage.js'
import Entity from './entity.js'





export default class Player extends Entity {

    constructor() {
        super();
        this.canvas = canvas
        this.ctx = ctx;
        this.name = "Nuoram"

    }

    tick() {


        switch (this.currentState) {
            case this.state.ATTACK: this.attack();
                break;
            case this.state.ATTACK: this.idle();
                break;
            case this.state.ATTACK: this.run();
                break;
        }


        if (this.health > 0) {
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

        columnCount = 22
        this.animAttack = new TiledImage('../../images/sprite/player_attack.png', columnCount, rowCount, refreshDelay, loopColum, scale)
        this.animAttack.setLooped(false)
        this.animAttack.changeRow(0)
        this.animAttack.changeMinMaxInterval(0, columnCount, doneEvent)


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