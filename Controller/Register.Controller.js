import { RegisterService } from "../Service/Register.Service";

export default class RegisterController {
    
    static async findAll() {
        try {
            return await RegisterService.findAll();
        } catch (error) {
            console.log("Erro no controller:", error.message);
            throw new Error(error.message);
        }
    }

    static async findAllByUser(userId){
        try{
            return await RegisterService.findAllByUser(userId);
        }
        catch (error) {
            console.log("Erro no controller:", error.message);
            throw new Error(error.message);
        }
    }


    static async findOne(id) {
        try {
            return await RegisterService.findOne(id);
        } catch (error) {
            console.log("Erro no controller:", error.message);
            throw new Error(error.message);
        }
    }

    static async create(model) {
        try {
            return await RegisterService.create(model);
        } catch (error) {
            console.log("Erro ao criar registro:", error.message);
            throw new Error(error.message);
        }
    }

    static async update(model, id) {
        try {
            return await RegisterService.update(model, id);
        } catch (error) {
            console.log("Erro ao atualizar registro:", error.message);
            throw new Error(error.message);
        }
    }

    static async delete(id) {
        try {
            return await RegisterService.delete(id);
        } catch (error) {
            console.log("Erro ao deletar registro:", error.message);
            throw new Error(error.message);
        }
    }
}