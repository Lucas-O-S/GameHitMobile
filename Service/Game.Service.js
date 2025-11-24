import { ExecuteHttpRequest } from "../utils/ExecuteHttpRequest";
import { authHeader } from "../utils/HeaderHelper";
import ImageHelper from "../utils/ImageHelper";

export class GameService {
    static async findAll() {
        return ExecuteHttpRequest.callout({
        url: "/Game?BuscaImagem=true",
        method: "GET",
        headers: authHeader,
        });
    }

    static async findOne(id) {
        return ExecuteHttpRequest.callout({
        url: `/Game/${id}`,
        method: "GET",
        headers: authHeader,
        });
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