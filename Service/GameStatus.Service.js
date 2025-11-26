import GameStatusModel from "../Models/GameStatus.model";
import { ExecuteHttpRequest } from "../utils/ExecuteHttpRequest";
import { authHeader } from "../utils/HeaderHelper";
import ImageHelper from "../utils/ImageHelper";

export class GameStatusService {
    static async findAll() {

        const headers = {
            ...(await authHeader()),
        };
        
        const result = await ExecuteHttpRequest.callout({
            url: "/GameStatus",
            method: "GET",
            headers: headers,
        });

        let GenreList = [];

        result.data.data.forEach(dataUnit => {
            
            console.log("Data Unit Status: ", dataUnit);
            GenreList.push(new GameStatusModel({
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