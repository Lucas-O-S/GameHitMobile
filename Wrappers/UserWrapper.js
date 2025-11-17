export const UserWrapper = (userModel) => {
    return {
        name: userModel.name,
        password: userModel.password,
    };
};
