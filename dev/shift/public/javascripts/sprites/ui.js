import {canvas,ctx,player} from '../adventure.js'
import Expression from './expression.js'

const HEIGHT = 50;
const WIDTH = 50;
const SPECIAL_KEY = {
    "(":"parantheseG",
    ")":"parantheseD",
    "_": "underscore",
    "}": "Crochet g",
    "{": "Crochet d",
    ";":"point virgule",
    "Shift": "Shift",
    ":":"doublePoint",
    ".":"point",
    ">":"point",
    "<":"point",
    "=":"egal",
    "\"":"guillemets",
    ",":"virgule",
    "[":"crochetg",
    "]":"crochetd"
}



const INVALID_KEY = ['Shift', 'Enter', 'Backspace']


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
        this.prop = null;
        this.newScore= false;
        this.newHealth = false;
        this.tempY = 0;
        this.newScoreValue = null;
        this.font = 55;
        this.opacity = 1;

        self.word = [] 

    }



    tick(){

        //If the player kill an enemy
        if(this.newScore){

            this.tempY += 2.5
            this.font -= 1.5
            this.opacity -= 0.05

            ctx.font = `${this.font}px Arial`
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fillText(this.newScoreValue,this.enemy.x,this.enemy.y - this.tempY)

            if(this.opacity < 0){
                this.newScore = false;      
                this.tempY = 0
                this.font = 55
                this.opacity = 1

                this.score += this.newScoreValue;
            }
        }

        //If the player recieve a hearth
        if(this.newHealth ){
            this.tempY += 2.5
            this.font -= 1.5

            ctx.drawImage(this.imgHealth,this.prop.x,this.prop.y-this.tempY,this.imgHealth.width,this.imgHealth.height)

            if(this.tempY > 75){
                player.type.health++;
                this.newHealth = false;      
                this.tempY = 0
                this.font = 55
                this.opacity = 1
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
            if(this.expressions[i] != "space"){
                ctx.drawImage(this.expressions[i],this.enemy.x-(this.length/2)+i*WIDTH,this.enemy.y-65,this.expressions[i].width,this.expressions[i].height)
            }
        }


    }

    addExpressions(string){   
        let word = this.currentWord.expression

        for(let i = 0;i<word.length;i++){
            let char = word[i]

            if(SPECIAL_KEY[word[i]] !== undefined){
                char = SPECIAL_KEY[word[i]]
            }
            
            if(char != " "){
                let key = new Image(WIDTH,HEIGHT);
                key.src = `../../images/keyboard/${char}.png`
                key.alt = char;
                this.expressions.push(key)
            }else{
                this.expressions.push("space")
            }


        }

        this.length = word.length*50


       

    }

    points(value){
        this.newScore = true;
        this.newScoreValue = value
    }

    health(state){
        if(player.type.health < player.type.maxHealth){
            this.newHealth = state;
        }
    }

    findWord(){
        this.currentWord = new Expression();
        setTimeout(() => {  
            this.addExpressions()
        }, 1000);   
    }

    checkInput(key){

        //**The first element is always the one to remove if the player answer correctly */ 

        console.log(`Input by user -> ${key}`);
        console.log(`Input needed -> ${this.expressions[0].alt}`);

        if(INVALID_KEY.includes(key)) return

        if((key == this.expressions[0].alt && !INVALID_KEY.includes(key)) ||( SPECIAL_KEY[key]== this.expressions[0].alt && !INVALID_KEY.includes(key))){
            this.expressions.splice(0,1)
            self.word.push({color:"green",char:key})
            console.log(self.word);
            return true;
        }

        
        return false;
        

    }

    getWord(){
        return self.word
    }

    setWord(){
        self.word = []
    }

}