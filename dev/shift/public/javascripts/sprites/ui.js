import {canvas,ctx,player} from '../adventure.js'

const HEIGHT = 50;
const WIDTH = 50;


export default class UI{
    constructor(){
        this.imgHealth = new Image(WIDTH,HEIGHT);
        this.imgHealth.src = '../../images/sprite/Health/heart.png'

        this.imgHealthHalf = new Image(WIDTH,HEIGHT);
        this.imgHealthHalf.src = '../../images/sprite/Health/heart_half.png'



        this.playerHealth = 0
        this.score = 0
        this.expressions = []
        this.enemy = null;


    }



    tick(){

        //Health
        for (let i = 0;i<this.playerHealth;i++){
            ctx.drawImage(this.imgHealth,50+this.imgHealth.width*i,50,this.imgHealth.width,this.imgHealth.height);
        }

        //Score
        ctx.font = "55px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(this.score,(canvas.width/2)-(ctx.measureText(this.score).width/2),100);

        //Expressions
        for(let i = 0;i<this.expressions.length; i++){
            ctx.drawImage(this.expressions[i],this.enemy.x+i*WIDTH,this.enemy.y-65,this.expressions[i].width,this.expressions[i].height)
        }


    }

    addExpressions(string,sprite){

        this.enemy = sprite;

        let key = new Image(WIDTH,HEIGHT);
        key.src = '../../images/keyboard/a.png'
        key.alt = "a";
        this.expressions.push(key)
    
        let key2 = new Image(WIDTH,HEIGHT);
        key2.src = '../../images/keyboard/b.png'
        key2.alt = "b";
        this.expressions.push(key2)
    
        let key3 = new Image(WIDTH,HEIGHT);
        key3.src = '../../images/keyboard/c.png'
        key3.alt = "c";
        this.expressions.push(key3)

    }

}