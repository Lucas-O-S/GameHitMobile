import StandardModel from "./StandardModel";

export default class UserModel extends StandardModel {

    #username;
    #email;
    #password;
    #userImage;

    constructor({id = null, username = "", email = "", password = "", userImage = null}) {
        super(id);
        this.#username = username;
        this.#email = email;
        this.#password = password;
        this.#userImage = userImage;
    }

    get username() { return this.#username; }
    set username(value) {
        if (!value || value.length < 1) throw new Error("Nome de usuário vazio");
        this.#username = value;
    }

    get email() { return this.#email; }
    set email(value) {
        if (!value || !value.includes('@')) throw new Error("Email inválido");
        this.#email = value;
    }

    get password() { return this.#password; }
    set password(value) {
        if (!value || value.length < 2) throw new Error("Senha muito curta");
        this.#password = value;
    }

    get userImage() { return this.#userImage; }
    set userImage(value) { this.#userImage = value; }
}