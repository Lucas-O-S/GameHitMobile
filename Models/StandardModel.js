


export default class StandardModel{
    #id;

    constructor(id = null) {
        this.#id = id;
    }

    get id(){
        return this.#id;
    }
    
    set id(value){
        if (Number.isNaN(value) || !Number.parseInt(value)){
            console.log("Id: " + value);
            throw new Error("Id invalido"); 
        }

        this.#id = value;
    }
}