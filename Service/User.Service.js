import { ExecuteHttpRequest } from "../utils/ExecuteHttpRequest";
import { authHeader, jsonHeader } from "../utils/HeaderHelper";
import { AuthHelper } from "../utils/AuthHelper";
import UserModel from "../Models/UserModel";
import { UserWrapper } from "../Wrappers/UserWrapper";

export class UserService {

    static async login(userModel) {
        console.log("Entrou em login");

        const headers = {
            ...jsonHeader
        };

        const body = UserWrapper(userModel);

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

    static async create(userModel) {
        console.log("Entrou em create");

        const headers = {
            ...jsonHeader,
        };

        const body = {
            name: userModel.name,
            password: userModel.password
        };

        const result = await ExecuteHttpRequest.callout({
            url: "/user",
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
            url: "/user",
            method: "GET",
            headers: headers
        });

        console.log(JSON.stringify(result));

        let usersList = [];

        if (result.data && result.data.data) {
            result.data.data.forEach((dataUnit) => {
                usersList.push(new UserModel({
                    id: dataUnit.id,
                    name: dataUnit.name,
                    password: ""
                }));
            });
        }

        console.log(usersList);

        if (result.data.status !== 200) {
            throw new Error(result.data.message);
        }

        return usersList;
    }

    static async findOne(id) {
        console.log("Entrou em findOne");

        const headers = {
            ...authHeader,
        };

        const result = await ExecuteHttpRequest.callout({
            url: "/user/" + id,
            method: "GET",
            headers: headers
        });

        console.log(JSON.stringify(result));

        if (result.data.status !== 200) {
            throw new Error(result.data.message);
        }

        const dataUnit = result.data.data;

        return new UserModel({
            id: dataUnit.id,
            name: dataUnit.name,
            password: ""
        });
    }

    static async update(userModel, id) {
        console.log("Entrou em update");

        const headers = {
            ...jsonHeader,
            ...authHeader
        };

        const body = {
            name: userModel.name,
            password: userModel.password
        };

        const result = await ExecuteHttpRequest.callout({
            url: "/user/" + id,
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
            url: "/user/" + id,
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
