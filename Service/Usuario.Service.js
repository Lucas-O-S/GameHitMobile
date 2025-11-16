import { ExecuteHttpRequest } from "../utils/ExecuteHttpRequest";
import { authHeader, jsonHeader } from "../utils/HeaderHelper";
import { AuthHelper } from "../utils/AuthHelper";
import UsuarioModel from "../Models/UsuarioModel";
import { UsuarioWrapper } from "../Wrappers/UsuarioWrapper";

export class UsuarioService {

    static async login(usuarioModel) {
        console.log("Entrou em login");

        const headers = {
            ...jsonHeader
        };

        const body = UsuarioWrapper(usuarioModel);

        const result = await ExecuteHttpRequest.callout({
            url: "/auth/login",
            method: "POST",
            body: body,
            headers: headers
        });

        console.log(JSON.stringify(result));
        
        if (result.data.status !== 200) {
            throw new Error(result.data.message);
        }

        const accessToken = result.data.dataUnit.access_token;
        
        AuthHelper.setAccessToken(accessToken);

        return result.data;
    }

    static async create(usuarioModel) {
        console.log("Entrou em create");

        const headers = {
            ...jsonHeader,
        };

        const body = {
            name: usuarioModel.name,
            password: usuarioModel.password
        };

        const result = await ExecuteHttpRequest.callout({
            url: "/usuario",
            method: "POST",
            body: body,
            headers: headers
        });

        console.log(JSON.stringify(result));

        const resultBody = result.data;
        if (result.data.status !== 201) {
            throw new Error(resultBody.message);
        }

        return result;
    }

    static async findAll() {
        console.log("Entrou em findAll");

        const headers = {
            ...authHeader
        };

        const result = await ExecuteHttpRequest.callout({
            url: "/usuario",
            method: "GET",
            headers: headers
        });

        console.log(JSON.stringify(result));

        let usuariosList = [];

        if (result.data && result.data.data) {
            result.data.data.forEach((dataUnit) => {
                usuariosList.push(new UsuarioModel({
                    id: dataUnit.id,
                    name: dataUnit.name,
                    password: ""
                }));
            });
        }

        console.log(usuariosList);

        if (result.data.status !== 200) {
            throw new Error(result.data.message);
        }

        return usuariosList;
    }

    static async findOne(id) {
        console.log("Entrou em findOne");

        const headers = {
            ...authHeader,
        };

        const result = await ExecuteHttpRequest.callout({
            url: "/usuario/" + id,
            method: "GET",
            headers: headers
        });

        console.log(JSON.stringify(result));

        if (result.data.status !== 200) {
            throw new Error(result.data.message);
        }

        const dataUnit = result.data.data;

        return new UsuarioModel({
            id: dataUnit.id,
            name: dataUnit.name,
            password: ""
        });
    }

    static async update(usuarioModel, id) {
        console.log("Entrou em update");

        const headers = {
            ...jsonHeader,
            ...authHeader
        };

        const body = {
            name: usuarioModel.name,
            password: usuarioModel.password
        };

        const result = await ExecuteHttpRequest.callout({
            url: "/usuario/" + id,
            method: "PUT",
            body: body,
            headers: headers
        });

        console.log(JSON.stringify(result));

        const resultBody = result.data;
        if (result.data.status !== 200) {
            throw new Error(resultBody.message);
        }

        return result;
    }

    static async delete(id) {
        console.log("Entrou em delete");

        const headers = {
            ...authHeader
        };

        const result = await ExecuteHttpRequest.callout({
            url: "/usuario/" + id,
            method: "DELETE",
            headers: headers
        });

        console.log(JSON.stringify(result));

        if (result.status !== 200) {
            throw new Error(result.data.message);
        }

        return result;
    }

    static async retrieveUser() {
        console.log("Entrou em retrieveUser");

        const headers = {
            ...authHeader,
            ...jsonHeader
        };

        const result = await ExecuteHttpRequest.callout({
            url: "/auth/retrieve-user",
            method: "GET",
            headers: headers
        });

        console.log(JSON.stringify(result));

        if (result.data.status !== 200) {
            throw new Error(result.data.message);
        }


        return result.data.dataUnit;
    }
}
