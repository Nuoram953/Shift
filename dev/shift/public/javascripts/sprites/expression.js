import {Factory} from '../factory.js'

export default class Expression {
    constructor() {
        this.expression = this.request();
        this.index = 0

    }



    request() {
        fetch("/adventure/expression", {
            method: "GET",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.expression = data
            })
            .catch(console.error);


    }
}