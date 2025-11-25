import { convertDmyToStandardDate } from "../utils/DateConverter"

export const registerWrapper = (registerModel) => {
    return {
        review : registerModel.review,
        startedDate : convertDmyToStandardDate(registerModel.startedDate),
        completedDate : convertDmyToStandardDate(registerModel.completedDate),
        personalRating : registerModel.personalRating,
        userId : registerModel.userId,
        gameId : registerModel.game.id,
        gameStatusId : registerModel.gameStatus.id,
    }
}