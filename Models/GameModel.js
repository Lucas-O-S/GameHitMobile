import GenreModel from "./Genre.model";
import StandardModel from "./StandardModel";

export default class GameModel extends StandardModel {
    #name;
    #firstReleaseDate;
    #genreId;
    #cover;
    #genre;

    constructor({ id = null, name = "", firstReleaseDate = "", genreId = null, cover = null, genre = null}) {
        super(id);
        this.#name = name;
        this.#firstReleaseDate = firstReleaseDate;
        this.#genreId = genreId;
        this.#cover = cover;
        this.#genre = new GenreModel(genre) ?? null;
    }

    get name() { return this.#name; }
    set name(value) {
        if (!value || value.length < 1) throw new Error("Nome do jogo inválido");
        this.#name = value;
    }

    get firstReleaseDate() { return this.#firstReleaseDate; }
    set firstReleaseDate(value) { this.#firstReleaseDate = value; }

    get genreId() { return this.#genreId; }
    set genreId(value) { this.#genreId = value; }

    get cover() { return this.#cover; }
    set cover(value) { this.#cover = value; }
    
    get genre() { return this.#genre; }
}