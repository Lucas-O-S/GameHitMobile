import { ExecuteHttpRequest } from "../utils/ExecuteHttpRequest";
import { authHeader, jsonHeader, multipartHeader } from "../utils/HeaderHelper";
import { AuthHelper } from "../utils/AuthHelper";
import ImageHelper from "../utils/ImageHelper";
import UserModel from "../Models/UserModel";
import { UserWrapper } from "../Wrappers/UserWrapper";

export class UserService {

    static async login(userModel) {
        console.log("Entrou em login");

        const headers = {
            ...jsonHeader
        };

        const body = {
            email: `${userModel.email}`,
            password: `${userModel.password}`
        };

        const result = await ExecuteHttpRequest.callout({
            url: "/auth/login",
            method: "POST",
            body: body,
            headers: headers
        });
        
        if (result.data.statusCode === 400) {
            const msg = Array.isArray(result.data.message) 
                ? result.data.message.join(", ") 
                : result.data.message;
            throw new Error(msg);
        }

        if (result.data.status !== 200 && result.status !== 200 && result.status !== 201) {
            throw new Error(result.data.message || "Erro ao fazer login");
        }

        if (result.data.dataUnit && result.data.dataUnit.access_token) {
            const accessToken = result.data.dataUnit.access_token;
            await AuthHelper.setAccessToken(accessToken);
        } else {
            throw new Error("Token não retornado pelo servidor");
        }

        return result.data;
    }

    static async create(userModel) {
        console.log("Entrou em create");

        const headers = { ...multipartHeader };

        const formData = new FormData();
        formData.append('username', userModel.username);
        formData.append('email', `${userModel.email}`);
        formData.append('password', userModel.password);
        formData.append('roleId', '2');

        if (userModel.userImage) {
            const file = ImageHelper.convertUriToFile(userModel.userImage);
            formData.append('userImage', {
                uri: file.uri,
                username: file.username,
                type: file.type
            });
        }

        const result = await ExecuteHttpRequest.callout({
            url: "/User",
            method: "POST",
            body: formData,
            headers: headers
        });

        if (!result?.data || result.data.status !== 201) {
            throw new Error(result?.data?.message || "Erro ao criar usuário");
        }

        return result.data;
    }

    static async findAll() {
        console.log("Entrou em findAll");

        const headers = {
            ...(await authHeader()),
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
                
                const image64 = dataUnit.userImage ? ImageHelper.convertByteToBase64(dataUnit.userImage) : "";

                usersList.push(new UserModel({
                    id: dataUnit.id,
                    username: dataUnit.username,
                    email: dataUnit.email, 
                    userImage: image64,
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
            ...(await authHeader()),
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

        const dataUnit = result.data.dataUnit;

        const image64 = dataUnit.userImage ? ImageHelper.convertByteToBase64(dataUnit.userImage) : "";

        return new UserModel({
            id: dataUnit.id,
            username: dataUnit.username,
            email: dataUnit.email,
            password: "",
            userImage: image64
        });
    }

    static async update(userModel, id) {
        const form = new FormData();


        console.log('email:',userModel.email)

        form.append("username", userModel.username);
        form.append("email", `${userModel.email}`);
        form.append("password", userModel.password);

        if (userModel.imageFile) {
            form.append("userImage", ImageHelper.convertBase64ToFile());
        }

        const headers = {
            ...(await authHeader()),
            ...multipartHeader
        };

        const result = await ExecuteHttpRequest.callout({
            url: "/user/" + id,
            method: "PUT",
            body: form,
            headers: headers
        });

        const resultBody = result.data;

        if (resultBody.status !== 200) {
            throw new Error(resultBody.message);
        }

        return result;
    }


    static async delete(id) {
        console.log("Entrou em delete");

        const headers = {
            ...(await authHeader()),
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
            ...(await authHeader()),
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
