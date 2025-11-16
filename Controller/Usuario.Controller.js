import { UsuarioService } from "../Service/Usuario.Service";
import UsuarioModel from "../Models/UsuarioModel";

export default class UsuarioController {

    static async login(usuarioModel) {
        try {
            const result = await UsuarioService.login(usuarioModel);
            return result;
        } catch (error) {
            console.log("Erro ao fazer login:", error.message);
            throw new Error(error.message);
        }
    }

    static async createUsuario(usuarioModel) {
        try {
            const result = await UsuarioService.create(usuarioModel);
            return result;
        } catch (error) {
            console.log("Erro ao criar usuário:", error.message);
            throw new Error(error.message);
        }
    }

    static async findAllUsuarios() {
        try {
            return await UsuarioService.findAll();
        } catch (error) {
            console.log("Erro ao buscar usuários:", error.message);
            throw new Error(error.message);
        }
    }

    static async findOneUsuario(id) {
        try {
            if (!id || isNaN(id)) {
                throw new Error("ID do usuário inválido");
            }

            return await UsuarioService.findOne(id);
        } catch (error) {
            console.log("Erro ao buscar usuário:", error.message);
            throw new Error(error.message);
        }
    }

    static async updateUsuario(usuarioModel, id) {
        try {
            const result = await UsuarioService.update(usuarioModel, id);
            return result;
        } catch (error) {
            console.log("Erro ao atualizar usuário:", error.message);
            throw new Error(error.message);
        }
    }

    static async deleteUsuario(id) {
        try {
            if (!id || isNaN(id)) {
                throw new Error("ID do usuário inválido");
            }

            const result = await UsuarioService.delete(id);
            return result;
        } catch (error) {
            console.log("Erro ao deletar usuário:", error.message);
            throw new Error(error.message);
        }
    }

    static async retrieveUser() {
        try {
            const result = await UsuarioService.retrieveUser();
            return result;
        } catch (error) {
            console.log("Erro ao recuperar usuário:", error.message);
            throw new Error(error.message);
        }
    }
}
