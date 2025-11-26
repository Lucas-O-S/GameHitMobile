import { ExecuteHttpRequest } from "../utils/ExecuteHttpRequest";
import { authHeader, jsonHeader, multipartHeader } from "../utils/HeaderHelper";
import { registerWrapper } from "../Wrappers/RegisterWrapper";
import RegisterModel from "../Models/RegisterModel";
import { convertStandardDateToDmy } from "../utils/DateConverter";
import GameStatusModel from "../Models/GameStatus.model";
import GameModel from "../Models/GameModel";

export class RegisterService {

    static async create(registerModel) {
        const headers = {
            ...jsonHeader,
            ...(await authHeader())
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
        const headers = {
            ...(await authHeader()),
        };

        const result = await ExecuteHttpRequest.callout({
            url: "/Register",
            method: "GET",
            headers: headers
        });

        let registerList = [];

        if (result.data && result.data.data) {
            result.data.data.forEach((dataUnit) => {
                registerList.push(new RegisterModel({
                    id: dataUnit.id,
                    review: dataUnit.review,
                    startedDate: convertStandardDateToDmy(dataUnit.startedDate),
                    completedDate: convertStandardDateToDmy(dataUnit.completedDate),
                    personalRating: dataUnit.personalRating,
                    userId: dataUnit.userId,
                    game: dataUnit.game,
                    gameStatus: dataUnit.gameStatus,
                }));
            });
        }

        if (result.data.status !== 200) {
            throw new Error(result.data.message);
        }

        return registerList;
    }

    static async findAllByUser(userId) {
        const headers = {
            ...(await authHeader()),
        };

        const result = await ExecuteHttpRequest.callout({
            url: "/Register/findByUser/" + userId,
            method: "GET",
            headers: headers,
            param: {BuscaImagem : true}
        });

        let registerList = [];


 if (result.data && result.data.data) {


            result.data.data.forEach((dataUnit) => {
                const image64 = dataUnit.game.cover
                    ? ImageHelper.convertByteToBase64(dataUnit.game.cover)
                    : null;

                console.log("game id:", dataUnit.game.id);
                registerList.push(new RegisterModel({
                    id: dataUnit.id,
                    review: dataUnit.review,
                    startedDate: convertStandardDateToDmy(dataUnit.startedDate),
                    completedDate: convertStandardDateToDmy(dataUnit.completedDate),
                    personalRating: dataUnit.personalRating,
                    userId: dataUnit.userId,
                    game: new GameModel({
                        name: dataUnit.game.name,
                        id: dataUnit.game.id,
                        firstReleaseDate: dataUnit.game.firstReleaseDate,
                        cover: image64,
                        genre: dataUnit.game.genre

                    }),
                    gameStatus: new GameStatusModel (dataUnit.gameStatus),
                }));
            });
        }


        if (result.data.status !== 200) {
            throw new Error(result.data.message);
        }

        return registerList;
    }

    static async findAllByStatus(userId, statusId) {
        const headers = {
            ...(await authHeader()),
        };

        const result = await ExecuteHttpRequest.callout({
            url: `/Register/findByUser/${userId}/status/${statusId}`,
            method: "GET",
            headers: headers
        });

        let registerList = [];

        if (result.data && result.data.data) {
            result.data.dataUnit.forEach((dataUnit) => {
                registerList.push(new RegisterModel({
                    id: dataUnit.id,
                    review: dataUnit.review,
                    startedDate: convertStandardDateToDmy(dataUnit.startedDate),
                    completedDate: convertStandardDateToDmy(dataUnit.completedDate),
                    personalRating: dataUnit.personalRating,
                    userId: dataUnit.userId,
                    game: dataUnit.game,
                    gameStatus: dataUnit.gameStatus,
                }));
            });
        }

        if (result.data.status !== 200) {
            throw new Error(result.data.message);
        }

        return registerList;
    }

    static async findOne(id) {
        const headers = {
            ...(await authHeader()),
        };

        const result = await ExecuteHttpRequest.callout({
            url: "/Register/" + id,
            method: "GET",
            headers: headers
        });

        if (result.data.status !== 200) {
            throw new Error(result.data?.message || "Registro não encontrado");
        }

        const dataUnit = result.data.data;

        return new RegisterModel({
            id: dataUnit.id,
            review: dataUnit.review,
            startedDate: convertStandardDateToDmy(dataUnit.startedDate),
            completedDate: convertStandardDateToDmy(dataUnit.completedDate),
            personalRating: dataUnit.personalRating,
            userId: dataUnit.userId,
            game: dataUnit.game,
            gameStatus: dataUnit.gameStatus,
        });
    }

    static async update(registerModel, id) {
        const headers = {
            ...jsonHeader,
            ...(await authHeader())
        };

        const body = registerWrapper(registerModel);

        const result = await ExecuteHttpRequest.callout({
            url: "/Register/" + id,
            method: "PUT",
            body: body,
            headers: headers
        });

        if (result.data.status !== 200) {
            throw new Error(result.data.message);
        }

        return result.data;
    }

    static async delete(id) {
        const headers = {
            ...(await authHeader())
        };

        const result = await ExecuteHttpRequest.callout({
            url: "/Register/" + id,
            method: "DELETE",
            headers: headers
        });

        if (result.data.status !== 200) {
            throw new Error(result.data.message);
        }

        return result.data;
    }

}
