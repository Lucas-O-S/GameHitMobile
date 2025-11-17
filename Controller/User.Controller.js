import { UserService } from "../Service/User.Service";
import UserModel from "../Models/UserModel";

export default class UserController {

    static async login(UserModel) {
        try {
            const result = await UserService.login(UserModel);
            return result;
        } catch (error) {
            console.log("Erro ao fazer login:", error.message);
            throw new Error(error.message);
        }
    }

    static async createUser(UserModel) {
        try {
            const result = await UserService.create(UserModel);
            return result;
        } catch (error) {
            console.log("Erro ao criar usuário:", error.message);
            throw new Error(error.message);
        }
    }

    static async findAllUsers() {
        try {
            return await UserService.findAll();
        } catch (error) {
            console.log("Erro ao buscar usuários:", error.message);
            throw new Error(error.message);
        }
    }

    static async findOneUser(id) {
        try {
            if (!id || isNaN(id)) {
                throw new Error("ID do usuário inválido");
            }

            return await UserService.findOne(id);
        } catch (error) {
            console.log("Erro ao buscar usuário:", error.message);
            throw new Error(error.message);
        }
    }

    static async updateUser(UserModel, id) {
        try {
            const result = await UserService.update(UserModel, id);
            return result;
        } catch (error) {
            console.log("Erro ao atualizar usuário:", error.message);
            throw new Error(error.message);
        }
    }

    static async deleteUser(id) {
        try {
            if (!id || isNaN(id)) {
                throw new Error("ID do usuário inválido");
            }

            const result = await UserService.delete(id);
            return result;
        } catch (error) {
            console.log("Erro ao deletar usuário:", error.message);
            throw new Error(error.message);
        }
    }

    static async retrieveUser() {
        try {
            const result = await UserService.retrieveUser();
            return result;
        } catch (error) {
            console.log("Erro ao recuperar usuário:", error.message);
            throw new Error(error.message);
        }
    }
}
