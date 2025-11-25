import { ExecuteHttpRequest } from "../utils/ExecuteHttpRequest";
import { authHeader, jsonHeader, multipartHeader } from "../utils/HeaderHelper";
import { AuthHelper } from "../utils/AuthHelper";
import ImageHelper from "../utils/ImageHelper";
import UserModel from "../Models/UserModel";
import { UserWrapper } from "../Wrappers/UserWrapper";
import { RegisterWrapper } from "../Wrappers/RegisterWrapper";
import RegisterModel from "../Models/RegisterModel";
import { convertStandardDateToDmy } from "../utils/DateConverter";

export class UserService {

    static async create(registerModel) {
        console.log("Entrou em create");

        const headers = {
            ...multipartHeader,
            ...AuthHelper
        };

        const body = registerWrapper(registerModel);

        const result = await ExecuteHttpRequest.callout({
            url: "/Register",
            method: "POST",
            body: body,
            headers: headers
        });

        if (!result?.data || result.data.status !== 201) {
            throw new Error(result?.data?.message || "Erro ao criar registro");
        }

        return result.data;
    }

    static async findAll() {
        console.log("Entrou em findAll");

        const headers = {
            ...authHeader
        };

        const result = await ExecuteHttpRequest.callout({
            url: "/Register",
            method: "GET",
            headers: headers
        });

        console.log(JSON.stringify(result));

        let RegisterList = [];

        if (result.data && result.data.data) {
            result.data.data.forEach((dataUnit) => {
                RegisterList.push(new RegisterModel({
                    id : dataUnit.id,
                    review : dataUnit.review,
                    startedDate : convertStandardDateToDmy(dataUnit.startedDate),
                    completedDate : convertStandardDateToDmy(dataUnit.completedDate),
                    personalRating : dataUnit.personalRating,
                    userId : dataUnit.userId,
                    gameId : dataUnit.gameId,
                    gameStatusId : dataUnit.gameStatusId,

                }));
            });
        }

        console.log(usersList);

        if (result.data.status !== 200) {
            throw new Error(result.data.message);
        }

        return usersList;
    }

    static async findAllByUser(userId) {
        console.log("Entrou em findAll");

        const headers = {
            ...authHeader
        };

        const result = await ExecuteHttpRequest.callout({
            url: "/Register/findByUser/" + userId,
            method: "GET",
            headers: headers
        });

        console.log(JSON.stringify(result));

        let RegisterList = [];

        if (result.data && result.data.data) {
            result.data.data.forEach((dataUnit) => {
                RegisterList.push(new RegisterModel({
                    id : dataUnit.id,
                    review : dataUnit.review,
                    startedDate : convertStandardDateToDmy(dataUnit.startedDate),
                    completedDate : convertStandardDateToDmy(dataUnit.completedDate),
                    personalRating : dataUnit.personalRating,
                    userId : dataUnit.userId,
                    gameId : dataUnit.gameId,
                    gameStatusId : dataUnit.gameStatusId,

                }));
            });
        }

        console.log(usersList);

        if (result.data.status !== 200) {
            throw new Error(result.data.message);
        }

        return usersList;
    }

    static async findAllByStatus(userId, StatusId) {
        console.log("Entrou em findAll");

        const headers = {
            ...authHeader
        };

        const result = await ExecuteHttpRequest.callout({
            url: "/Register/findByUser/" + userId,
            method: "GET",
            headers: headers
        });

        console.log(JSON.stringify(result));

        let RegisterList = [];

        if (result.data && result.data.data) {
            result.data.data.forEach((dataUnit) => {
                RegisterList.push(new RegisterModel({
                    id : dataUnit.id,
                    review : dataUnit.review,
                    startedDate : convertStandardDateToDmy(dataUnit.startedDate),
                    completedDate : convertStandardDateToDmy(dataUnit.completedDate),
                    personalRating : dataUnit.personalRating,
                    userId : dataUnit.userId,
                    gameId : dataUnit.gameId,
                    gameStatusId : dataUnit.gameStatusId,

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

        return new RegisterModel({
                    id : dataUnit.id,
                    review : dataUnit.review,
                    startedDate : convertStandardDateToDmy(dataUnit.startedDate),
                    completedDate : convertStandardDateToDmy(dataUnit.completedDate),
                    personalRating : dataUnit.personalRating,
                    userId : dataUnit.userId,
                    gameId : dataUnit.gameId,
                    gameStatusId : dataUnit.gameStatusId,

                });
    }

    static async update(userModel, id) {
        console.log("Entrou em update");

        const headers = {
            ...jsonHeader,
            ...authHeader
        };

        const body = registerWrapper(registerModel);


        const result = await ExecuteHttpRequest.callout({
            url: "/Register/" + id,
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
            url: "/Register/" + id,
            method: "DELETE",
            headers: headers
        });

        console.log(JSON.stringify(result));

        if (result.status !== 200) {
            throw new Error(result.data.message);
        }

        return result;
    }

}
