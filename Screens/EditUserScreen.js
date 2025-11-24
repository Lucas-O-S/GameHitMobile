import React, { useState, useEffect } from "react";
import { View, Alert, ScrollView, Text } from "react-native";
import InputTextComponent from "../Components/InputTextComponent";
import InputImageComponent from "../Components/InputImageComponent";
import ButtonComponent from "../Components/ButtonComponent";
import LoadingOverlay from "../Components/LoadingOverlay";
import UserController from "../Controller/User.Controller";
import UserModel from "../Models/UserModel";
import { GlobalStyles, Colors } from "../Styles/Theme";

export default function EditUserScreen({ route, navigation }) {
    // Pode receber o objeto 'user' completo OU apenas o 'userId' (no caso do próprio perfil)
    const { user, userId } = route.params || {}; 
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); // Senha opcional na edição
    const [imageUri, setImageUri] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    // Carregar dados iniciais
    useEffect(() => {
        async function loadInitialData() {
            if (user) {
                // Veio do Admin (objeto pronto)
                setUsername(user.username);
                setCurrentId(user.id);
            } else if (userId) {
                // Veio do "Meu Perfil" (precisa buscar)
                setLoading(true);
                try {
                    const fetchedUser = await UserController.findOneUser(userId);
                    setUsername(fetchedUser.username);
                    setCurrentId(fetchedUser.id);
                } catch (error) {
                    Alert.alert("Erro", "Falha ao carregar perfil");
                    navigation.goBack();
                } finally {
                    setLoading(false);
                }
            }
        }
        loadInitialData();
    }, [user, userId]);

    async function save() {
        if (!username) return Alert.alert("Erro", "Nome de usuário não pode ser vazio");
        
        setLoading(true);
        try {
            // Cria model. Se password for vazio, o backend deve ignorar ou validar
            const userToUpdate = new UserModel({
                id: currentId,
                username: username,
                password: password || undefined, // Envia undefined se vazio para não alterar senha (depende do backend)
                userImage: imageUri
            });

            await UserController.updateUser(userToUpdate, currentId);
            
            Alert.alert("Sucesso", "Dados atualizados!");
            navigation.goBack();
        } catch (e) {
            Alert.alert("Erro", e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={GlobalStyles.container}>
            <LoadingOverlay visible={loading} />

            <Text style={{color: Colors.textSecondary, marginBottom: 20, textAlign: 'center'}}>
                Editando: {username}
            </Text>

            <InputImageComponent 
                label="Alterar Foto"
                onChange={(file) => setImageUri(file.uri)} 
            />

            <InputTextComponent label="Nome de Usuário" value={username} onChangeText={setUsername} />
            
            <InputTextComponent 
                label="Nova Senha (deixe em branco para manter)" 
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry 
            />

            <View style={{marginTop: 20}}>
                <ButtonComponent label="Salvar Alterações" pressFunction={save} />
            </View>
        </ScrollView>
    );
}