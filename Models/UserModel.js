import StandardModel from "./StandardModel";

export default class UserModel extends StandardModel {

    #name;
    #password;

    constructor({id = null, name = "", password = ""}) {
        super(id);
        this.#name = name;
        this.#password = password;
    }

    get name() {
        return this.#name;
    }

    get password() {
        return this.#password;
    }

    set name(value) {
        if (!value || value.length < 1) {
            throw new Error("Nome está vazio");
        }
        this.#name = value;
    }

    set password(value) {
        if (!value || value.length < 1) {
            throw new Error("Senha está vazia");
        }
        this.#password = value;
    }
}
