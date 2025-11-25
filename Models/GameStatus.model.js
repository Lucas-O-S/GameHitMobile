

import StandardModel from "./StandardModel";

export default class GameStatusModel extends StandardModel {
    #name;

    constructor({ id = null, name = ""}) {
        super(id);
        this.#name = name;
    }

    get name() { return this.#name; }
    
    set name(value) {
        if (!value || value.length < 1) throw new Error("Nome do Status inválido");
        this.#name = value;
    }


}