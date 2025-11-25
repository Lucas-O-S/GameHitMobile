

import StandardModel from "./StandardModel";

export default class GenreModel extends StandardModel {
    #name;

    constructor({ id = null, name = ""}) {
        super(id);
        this.#name = name;
    }

    get name() { return this.#name; }
    
    set name(value) {
        if (!value || value.length < 1) throw new Error("Nome de genêro de jogo inválido");
        this.#name = value;
    }


}