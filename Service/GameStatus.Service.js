import GameStatusModel from "../Models/GameStatus.model";
import GenreModel from "../Models/Genre.model";
import { ExecuteHttpRequest } from "../utils/ExecuteHttpRequest";
import { authHeader } from "../utils/HeaderHelper";
import ImageHelper from "../utils/ImageHelper";

export class GameStatusService {
    static async findAll() {
        const result = await ExecuteHttpRequest.callout({
            url: "/GameStatus",
            method: "GET",
            headers: authHeader,
        });

        let GenreList = [];

        result.data.data.array.forEach(dataUnit => {
            
            GenreList.push(new GenreModel({
                id : dataUnit.id,
                name : dataUnit.name,
            }))

        });

        return GenreList;

    }

    static async findOne(id) {
        const result = await ExecuteHttpRequest.callout({
            url: `/GameStatus/${id}`,
            method: "GET",
            headers: authHeader,
        });

        return new GameStatusModel({
                id : dataUnit.id,
                name : dataUnit.name,
            })
    }

 
}