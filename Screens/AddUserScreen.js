import React, { useState } from "react";
import { View, Alert, ScrollView } from "react-native";
import InputTextComponent from "../Components/InputTextComponent";
import InputImageComponent from "../Components/InputImageComponent";
import ButtonComponent from "../Components/ButtonComponent";
import LoadingOverlay from "../Components/LoadingOverlay";
import UserController from "../Controller/User.Controller";
import UserModel from "../Models/UserModel";
import { GlobalStyles } from "../Styles/Theme";

export default function AddUserScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUri, setImageUri] = useState(null);
    const [loading, setLoading] = useState(false);

    async function save() {
        if (!username || !email || !password) return Alert.alert("Atenção", "Preencha os campos obrigatórios.");

        setLoading(true);
        try {
            const newUser = new UserModel({
                username,
                email,
                password,
                userImage: imageUri
            });

            await UserController.createUser(newUser);
            Alert.alert("Sucesso", "Usuário criado!");
            navigation.goBack();
        } catch (err) {
            Alert.alert("Erro", err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={GlobalStyles.container}>
            <LoadingOverlay visible={loading} />

            <InputImageComponent onChange={(file) => setImageUri(file.uri)} />

            <InputTextComponent label="Nome de Usuário" value={username} onChangeText={setUsername} />
            <InputTextComponent label="Email" value={email} onChangeText={setEmail} keyboardType="email-address"/>
            <InputTextComponent label="Senha Inicial" value={password} onChangeText={setPassword} secureTextEntry />

            <View style={{marginTop: 20}}>
                <ButtonComponent label="Criar Usuário" pressFunction={save} />
            </View>
        </ScrollView>
    );
}