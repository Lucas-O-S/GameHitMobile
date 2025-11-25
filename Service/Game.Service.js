import GameModel from "../Models/GameModel";
import GenreModel from "../Models/Genre.model";
import { ExecuteHttpRequest } from "../utils/ExecuteHttpRequest";
import { authHeader } from "../utils/HeaderHelper";
import ImageHelper from "../utils/ImageHelper";

export class GameService {
    static async findAll() {
        
        const headers = {
            ...authHeader
        };

        const result = ExecuteHttpRequest.callout({
        url: "/Game?BuscaImagem=true",
        method: "GET",
        headers: headers,
        });
               
        if (result.data.status != 200) {
            throw new Error(result.data.message);
        }

        let gameList = [];

        if (result.data && result.data.data) {
            result.data.data.forEach((dataUnit) => {
                let imagem64 = "";
                
                if (dataUnit.cover) {
                    imagem64 = ImageHelper.convertByteToBase64(dataUnit.cover);
                }

                gameList.push(new GameModel({
                    name : result.data.name,
                    firstReleaseDate : result.data.firstReleaseDate,
                    cover : imagem64,
                    genre : new GenreModel({
                        id :  result.data.genre.id,
                        name :  result.data.genre.name
                    })
                }))
            })
        }
    }

    static async findOne(id) {
        const result = ExecuteHttpRequest.callout({
        url: `/Game/${id}`,
        method: "GET",
        headers: authHeader,
        });

        
        if (result.data.status != 200) {
            throw new Error(result.data.message);
        }

        let imagem64 = "";
        
        if (data.data.dataUnit.cover) {
            imagem64 = ImageHelper.convertByteToBase64(dataUnit.cover);
        }


        return new GameModel({
            name : result.data.name,
            firstReleaseDate : result.data.firstReleaseDate,
            cover : imagem64,
            genre : new GenreModel({
                id :  result.data.genre.id,
                name :  result.data.genre.name
            })
        })
    }

    static async delete(id) {
        return ExecuteHttpRequest.callout({
        url: `/Game/${id}`,
        method: "DELETE",
        headers: authHeader,
        });
    }

    static async update(gameModel, imageUri) {
        const headers = { 
            ...authHeader(),
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

        return ExecuteHttpRequest.callout({
        url: "/Game",
        method: "POST",
        body: form,
        headers: authHeader,
        });
    }
}