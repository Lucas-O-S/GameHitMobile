import GenreModel from "../Models/Genre.model";
import { ExecuteHttpRequest } from "../utils/ExecuteHttpRequest";
import { authHeader } from "../utils/HeaderHelper";
import ImageHelper from "../utils/ImageHelper";

export class GenreService {
    static async findAll() {
        
        const headers = {
            ...authHeader
        }
        
        const result = ExecuteHttpRequest.callout({
            url: "/Genre",
            method: "GET",
            headers: headers,
        });

        let GenreList = [];

        result.data.data.array.forEach(dataUnit => {
            
            GenreList.push(new GenreModel({
                id : dataUnit.id,
                name : dataUnit.name,
            }))

        });

    }

    static async findOne(id) {
        const result = ExecuteHttpRequest.callout({
            url: `/Genre/${id}`,
            method: "GET",
            headers: authHeader,
        });

        return new GenreModel({
                id : dataUnit.id,
                name : dataUnit.name,
            })
    }

 
}