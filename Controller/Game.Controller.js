import { GameService } from "../Service/Game.Service";

export default class GameController {
    
    static async findAllGames() {
        try {
            return await GameService.findAll();
        } catch (error) {
            console.log("Erro no controller:", error.message);
            throw new Error(error.message);
        }
    }
    static async findOneGame(id) {
        try {
            return await GameService.findOne(id);
        } catch (error) {
            console.log("Erro no controller:", error.message);
            throw new Error(error.message);
        }
    }

    static async createGame(gameModel, imageUri) {
        try {
            return await GameService.create(gameModel, imageUri);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async updateGame(gameModel, imageUri) {
        try {
            return await GameService.update(gameModel, imageUri);
        } catch (error) {
            console.log("Erro ao atualizar jogo:", error.message);
            throw new Error(error.message);
        }
    }
}