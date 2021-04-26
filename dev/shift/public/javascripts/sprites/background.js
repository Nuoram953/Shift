import {
    canvas,
    ctx,
    state
} from '../adventure.js'
import Entity from './entity.js';


export default class Background extends Entity{
    constructor() {
        super();
        this.ctx = ctx;
        this.canvas = canvas;


        this.img = new Image();
        this.img.src = "../../images/background/Background.png"

        this.layer10 = new Image();
        this.layer10.src = "../../images/background/layer010.png"

        this.layer9 = new Image();
        this.layer9.src = "../../images/background/layer009.png"

        this.layer8 = new Image();
        this.layer8.src = "../../images/background/layer008.png"

        this.layer7 = new Image();
        this.layer7.src = "../../images/background/layer007.png"

        this.layer6 = new Image();
        this.layer6.src = "../../images/background/layer006.png"

        this.layer5 = new Image();
        this.layer5.src = "../../images/background/layer005.png"

        this.layer4 = new Image();
        this.layer4.src = "../../images/background/layer004.png"

        this.layer3 = new Image();
        this.layer3.src = "../../images/background/layer003.png"

        this.layer2 = new Image();
        this.layer2.src = "../../images/background/layer002.png"

        this.layer1 = new Image();
        this.layer1.src = "../../images/background/layer001.png"

        this.layer0 = new Image();
        this.layer0.src = "../../images/background/layer000.png"
        
        
        this.x = 0
        this.xLayer0 = 0;
        this.xLayer1 = 0;
        this.xLayer2 = 0;
        this.xLayer3 = 0;
        this.xLayer4 = 0;
        this.xLayer5 = 0;
        this.xLayer6 = 0;
        this.xLayer7 = 0;
        this.xLayer8 = 0;
        this.xLayer9 = 0;

        this.speed = -0.3;
        
        this.speedLayer0 = -0.3;
        this.speedLayer1 = -0.3;
        this.speedLayer2 = -0.3;
        this.speedLayer3 = -0.3;
        this.speedLayer4 = -0.2;
        this.speedLayer5 = -0.2;
        this.speedLayer6 = -0.2;
        this.speedLayer7 = -0.1;
        this.speedLayer8 = -0.1;
        this.speedLayer9 = -0.1;
  

    }


    changeAnimation(state) {
        this.currentState = state
    }

    tick() {
       
        if (this.currentState == "run"){
            this.x += this.speed;
            this.x %= this.canvas.width
    
            this.xLayer0 += this.speedLayer0;
            this.xLayer0 %= this.canvas.width
    
            this.xLayer1 += this.speedLayer1;
            this.xLayer1 %= this.canvas.width
    
            this.xLayer2 += this.speedLayer2;
            this.xLayer2 %= this.canvas.width
    
            this.xLayer3 += this.speedLayer3;
            this.xLayer3 %= this.canvas.width
    
            this.xLayer4 += this.speedLayer4;
            this.xLayer4 %= this.canvas.width
    
            this.xLayer5 += this.speedLayer5;
            this.xLayer5 %= this.canvas.width
    
            this.xLayer6 += this.speedLayer6;
            this.xLayer6 %= this.canvas.width
    
            this.xLayer7 += this.speedLayer7;
            this.xLayer7 %= this.canvas.width
    
            this.xLayer8 += this.speedLayer8;
            this.xLayer8 %= this.canvas.width

            this.xLayer9 += this.speedLayer9;
            this.xLayer9 %= this.canvas.width
            
        }
        
        // Layer -> 10
        ctx.drawImage(this.layer10,this.x,0,this.canvas.width,this.canvas.height)
        ctx.drawImage(this.layer10,this.x+this.canvas.width,0,this.canvas.width,this.canvas.height)

        //Layer -> 9
        ctx.drawImage(this.layer9,this.x,0,this.canvas.width,this.canvas.height)
        ctx.drawImage(this.layer9,this.x+this.canvas.width,0,this.canvas.width,this.canvas.height)

        //Layer -> 8
        ctx.drawImage(this.layer8,this.xLayer8,0,this.canvas.width,this.canvas.height)
        ctx.drawImage(this.layer8,this.xLayer8+this.canvas.width,0,this.canvas.width,this.canvas.height)

        //Layer -> 7
        ctx.drawImage(this.layer7,this.xLayer7,0,this.canvas.width,this.canvas.height)
        ctx.drawImage(this.layer7,this.xLayer7+this.canvas.width,0,this.canvas.width,this.canvas.height)

        //Layer -> 6
        ctx.drawImage(this.layer6,this.xLayer6,0,this.canvas.width,this.canvas.height)
        ctx.drawImage(this.layer6,this.xLayer6+this.canvas.width,0,this.canvas.width,this.canvas.height)

        //Layer -> 6
        ctx.drawImage(this.layer5,this.xLayer5,0,this.canvas.width,this.canvas.height)
        ctx.drawImage(this.layer5,this.xLayer5+this.canvas.width,0,this.canvas.width,this.canvas.height)        
        
        //Layer -> 6
        ctx.drawImage(this.layer4,this.xLayer4,0,this.canvas.width,this.canvas.height)
        ctx.drawImage(this.layer4,this.xLayer4+this.canvas.width,0,this.canvas.width,this.canvas.height)

        //Layer -> 6
        ctx.drawImage(this.layer3,this.xLayer3,0,this.canvas.width,this.canvas.height)
        ctx.drawImage(this.layer3,this.xLayer3+this.canvas.width,0,this.canvas.width,this.canvas.height)
        
        //Layer -> 6
        ctx.drawImage(this.layer2,this.xLayer2,0,this.canvas.width,this.canvas.height)
        ctx.drawImage(this.layer2,this.xLayer2+this.canvas.width,0,this.canvas.width,this.canvas.height)

                        //Layer -> 6
        ctx.drawImage(this.layer1,this.xLayer1,0,this.canvas.width,this.canvas.height)
        ctx.drawImage(this.layer1,this.xLayer1+this.canvas.width,0,this.canvas.width,this.canvas.height)

        //Layer -> 6
        ctx.drawImage(this.layer0,this.xLayer0,0,this.canvas.width,this.canvas.height)
        ctx.drawImage(this.layer0,this.xLayer0+this.canvas.width,0,this.canvas.width,this.canvas.height)
    }

    createAnimation(){

    }
}