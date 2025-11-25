import React, { useState, useCallback } from "react";
import { View, Alert, ScrollView, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import InputTextComponent from "../Components/InputTextComponent";
import InputImageComponent from "../Components/InputImageComponent";
import ButtonComponent from "../Components/ButtonComponent";
import LoadingOverlay from "../Components/LoadingOverlay";

import UserController from "../Controller/User.Controller";
import UserModel from "../Models/UserModel";
import { GlobalStyles, Colors } from "../Styles/Theme";
import { AuthHelper } from "../utils/AuthHelper";
import ImageHelper from "../utils/ImageHelper";

export default function EditUserScreen({ navigation }) {

    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [imageUri, setImageUri] = useState(null);
    const [image64, setImage64] = useState(null);

    const [loading, setLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            async function loadData() {
                await loadInitialData();
            }
            loadData();
        }, [])
    );

    async function loadInitialData() {
        setLoading(true);

        try {
            const id = await AuthHelper.getUserIdFromToken();
            setUserId(id);

            const fetchedUser = await UserController.findOneUser(id);
            setUser(fetchedUser);

            setUsername(fetchedUser.username);
            setImage64(fetchedUser.userImage);
            setImageUri(null);

        } catch (error) {
            Alert.alert("Erro", "Falha ao carregar perfil");
            navigation.goBack();
        } finally {
            setLoading(false);
        }
    }

    async function save() {
        if (!username) {
            return Alert.alert("Erro", "Nome de usuário não pode ser vazio");
        }

        if (!password) {
            return Alert.alert("Erro", "A senha é obrigatória");
        }

        setLoading(true);

        try {
            const imageFile = await ImageHelper.convertBase64ToFile(image64);

            const userToUpdate = new UserModel({
                id: userId,
                email: user.email,
                username,
                password,
                imageFile
            });

            await UserController.updateUser(userToUpdate, userId);

            Alert.alert("Sucesso", "Dados atualizados!");
            navigation.goBack();

        } catch (e) {
            Alert.alert("Erro", e.message);
        } finally {
            setLoading(false);
        }
    }

    function handleImageChange(img) {
        try {
            setImageUri(img.uri);
            setImage64(img.base64);
        } catch {
            Alert.alert("Erro", "Falha ao selecionar imagem");
        }
    }

    return (
        <ScrollView contentContainerStyle={GlobalStyles.container}>
            <LoadingOverlay visible={loading} />

            <Text style={{ color: Colors.textSecondary, marginBottom: 20, textAlign: "center" }}>
                Editando: {username}
            </Text>

            <InputImageComponent
                value={image64}
                label="Foto de Perfil"
                onChange={handleImageChange}
            />

            <InputTextComponent 
                label="Nome de Usuário" 
                value={username} 
                onChangeText={setUsername} 
            />

            <InputTextComponent
                label="Senha (obrigatória)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <View style={{ marginTop: 20 }}>
                <ButtonComponent label="Salvar Alterações" pressFunction={save} />
            </View>
        </ScrollView>
    );
}
