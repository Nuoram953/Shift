import {canvas,ctx,player} from '../adventure.js'
import Expression from './expression.js'

const HEIGHT = 50;
const WIDTH = 50;
const SPECIAL_KEY = {
    ")":"paranthèse g",
    "(":"paranthèse d",
    "_": "underscore",
    "}": "Crochet g",
    "{": "Crochet d",
    ";":"point virgule"
}


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
        this.newScore= false;
        this.newScoreY = 0;
        this.newScoreValue = null;
        this.font = 55;
        this.opacity = 1;

    }



    tick(){

        if(this.newScore){

            this.newScoreY += 2.5
            this.font -= 1.5
            this.opacity -= 0.05

            ctx.font = `${this.font}px Arial`
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fillText(this.newScoreValue,this.enemy.x,this.enemy.y - this.newScoreY)

            if(this.opacity < 0){
                this.newScore = false;      
                this.newScoreY = 0
                this.font = 55
                this.opacity = 1

                this.score += this.newScoreValue;
            }
        }

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
            ctx.drawImage(this.expressions[i],this.enemy.x-(this.length/2)+i*WIDTH,this.enemy.y-65,this.expressions[i].width,this.expressions[i].height)
        }


    }

    addExpressions(string){   
        console.log( this.currentWord.expression['expression']);

        let count = 0;
        let word = this.currentWord.expression['expression']

        for(let i = 0;i<word.length;i++){
            let char = word[i]

            if(SPECIAL_KEY[word[i]] !== undefined){
                char = SPECIAL_KEY[word[i]]
            }
            
            let key = new Image(WIDTH,HEIGHT);
            key.src = `../../images/keyboard/${char}.png`
            key.alt = char;
            this.expressions.push(key)

        }

        this.length = word.length*50


       

    }

    points(value){
        this.newScore = true;
        this.newScoreValue = value
    }

    findWord(){
        this.currentWord = new Expression();
        setTimeout(() => {
            this.addExpressions()
        }, 1000);   
    }

    checkInput(key){

        console.log(`key by user --> ${key}`);
        console.log(`key should be --> ${this.expressions[this.currentWord.index].alt}`);

        if(key == this.expressions[this.currentWord.index].alt){
            this.expressions.splice(this.currentWord.index,1)
        }

        

    }

}