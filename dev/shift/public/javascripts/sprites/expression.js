import {factory} from '../factory.js'
import {canvas,ctx} from '../adventure'

export default class Expression {
    constructor() {
        this.expression = null;
        this.index = 0
        this.request();

    }



    request() {

        factory(1,10,canvas,ctx,"adventure").then(data => {
            console.log(data[1]);

            let word = ""

            data[1]['word'].forEach((letter) =>{
                word+=letter['char']
            })

            this.expression = word
            console.log(this.expression);
        })

    }
}