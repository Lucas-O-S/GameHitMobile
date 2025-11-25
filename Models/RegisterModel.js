import StandardModel from "./StandardModel";

export default class RegisterModel extends StandardModel {

    #review;
    #completedDate;
    #startedDate;
    #personalRating;
    #userId;
    #game;
    #gameStatus;

    constructor({
        id = null,
        review = "",
        completedDate = null,
        startedDate = null,
        personalRating = null,
        userId = null,
        game = null,
        gameStatus = null
    }) {
        super(id);

        this.review = review;
        this.completedDate = completedDate;
        this.startedDate = startedDate;
        this.personalRating = personalRating;
        this.userId = userId;
        this.game = game;
        this.gameStatus = gameStatus;
    }

    get review() { return this.#review; }
    set review(value) {
        if (typeof value !== "string")
            throw new Error("Review deve ser uma string.");
        if (!value.trim())
            throw new Error("Review não pode ser vazia.");
        this.#review = value.trim();
    }

    get completedDate() { return this.#completedDate; }
    set completedDate(value) {
        if (value !== null && !(value instanceof Date))
            throw new Error("completedDate deve ser um Date ou null.");
        this.#completedDate = value;
    }

    get startedDate() { return this.#startedDate; }
    set startedDate(value) {
        if (value !== null && !(value instanceof Date))
            throw new Error("startedDate deve ser um Date ou null.");
        this.#startedDate = value;
    }

    get personalRating() { return this.#personalRating; }
    set personalRating(value) {
        if (value !== null) {
            if (typeof value !== "number")
                throw new Error("personalRating deve ser um número.");
            if (value < 0 || value > 10)
                throw new Error("personalRating deve estar entre 0 e 10.");
        }
        this.#personalRating = value;
    }

    get userId() { return this.#userId; }
    set userId(value) {
        if (value !== null && typeof value !== "number")
            throw new Error("userId deve ser um número.");
        this.#userId = value;
    }

    get game() { return this.#game; }
    set game(value) {
        if (value !== null && typeof value !== "object")
            throw new Error("game deve ser um objeto ou null.");
        this.#game = value;
    }

    get gameStatus() { return this.#gameStatus; }
    set gameStatus(value) {
        if (value !== null && typeof value !== "object")
            throw new Error("gameStatus deve ser um objeto ou null.");
        this.#gameStatus = value;
    }
}
