import GameModel from "../Models/GameModel";
import GenreModel from "../Models/Genre.model";
import { ExecuteHttpRequest } from "../utils/ExecuteHttpRequest";
import { authHeader } from "../utils/HeaderHelper";
import ImageHelper from "../utils/ImageHelper";

export class GameService {
    static async findAll() {
        console.log("Chegou em find all")
        const headers = {
            ...(await authHeader()),
        };


        const result = await ExecuteHttpRequest.callout({
            url: "/Game",
            method: "GET",
            headers: headers,
            param: { getImage: true },
        });
        

        if (result.status != 200) {
            throw new Error(result.data.message);
        }

        let gameList = [];

        if (result.data && result.data.dataUnit) {
            result.data.dataUnit.forEach((dataUnit) => {
                let imagem64 = "";
                
                if (dataUnit.cover) {
                    imagem64 = ImageHelper.convertByteToBase64(dataUnit.cover);
                }

                gameList.push(new GameModel({
                    id: dataUnit.id,
                    name : dataUnit.name,
                    firstReleaseDate : dataUnit.firstReleaseDate,
                    cover : imagem64,
                    genre : new GenreModel({
                        id :  dataUnit.genre.id,
                        name :  dataUnit.genre.name
                    })
                }))
            })
        }
        console.log(gameList)
        return gameList;
    }

    static async findOne(id) {

        console.log("Chegou no findOne da service")

        const headers = {
            ...(await authHeader()),
        };

        console.log(id)
        

        const result = await ExecuteHttpRequest.callout({
        url: `/Game/${id}`,
        method: "GET",
        headers: headers,
        });

        
        if (result.data.status != 200) {
            throw new Error(result.data.message);
        }

        let imagem64 = "";
        
        if (result.data.dataUnit.cover) {
            imagem64 = ImageHelper.convertByteToBase64(result.data.dataUnit.cover);
        }


        return new GameModel({
            id: result.data.dataUnit.id,
            name : result.data.dataUnit.name,
            firstReleaseDate : result.data.dataUnit.firstReleaseDate,
            cover : imagem64,
            genre : new GenreModel({
                id :  result.data.dataUnit.genre.id,
                name :  result.data.dataUnit.genre.name
            })
        })
    }

    static async delete(id) {
        return await ExecuteHttpRequest.callout({
        url: `/Game/${id}`,
        method: "DELETE",
        headers: authHeader,
        });
    }

    static async update(gameModel, imageUri) {
        const headers = { 
            ...(await authHeader()),
            ...multipartHeader
        };

        const formData = new FormData();
        formData.append('name', gameModel.name);
        formData.append('firstReleaseDate', gameModel.firstReleaseDate);
        formData.append('genreId', String(gameModel.genreId));

        if (imageUri) {
            const file = ImageHelper.convertUriToFile(imageUri);
            formData.append('cover', {
                uri: file.uri,
                name: file.name,
                type: file.type
            });
        }

        const result = await ExecuteHttpRequest.callout({
            url: "/Game/" + gameModel.id,
            method: "PUT",
            body: formData,
            headers: headers
        });

        if (result.data?.status !== 200) {
            throw new Error(result.data?.message || "Erro ao atualizar jogo");
        }
        return result.data;
    }

    static async create(game, imageUri) {
        const form = new FormData();

        form.append("name", game.name);
        form.append("firstReleaseDate", game.firstReleaseDate);
        form.append("genreId", String(game.genreId));

        if (imageUri) {
        const file = ImageHelper.convertUriToFile(imageUri);
        form.append("cover", {
            uri: file.uri,
            name: file.name,
            type: file.type,
        });
        }

        return await ExecuteHttpRequest.callout({
        url: "/Game",
        method: "POST",
        body: form,
        headers: authHeader,
        });
    }
}