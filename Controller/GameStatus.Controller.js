import { GameStatusService } from '../Service/GameStatus.Service';

export default class GameStatusController {
    
    static async findAll() {
        try {
            return await GameStatusService.findAll();
        } catch (error) {
            console.log("Erro no controller:", error.message);
            throw new Error(error.message);
        }
    }
    static async findOne(id) {
        try {
            return await GameStatusService.findOne(id);
        } catch (error) {
            console.log("Erro no controller:", error.message);
            throw new Error(error.message);
        }
    }

}