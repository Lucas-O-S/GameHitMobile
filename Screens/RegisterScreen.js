import React, { useState } from "react";
import { View, ScrollView, Alert, Text, TouchableOpacity } from "react-native";
import InputTextComponent from "../Components/InputTextComponent";
import ButtonComponent from "../Components/ButtonComponent";
import InputImageComponent from "../Components/InputImageComponent";
import LoadingOverlay from "../Components/LoadingOverlay";
import UserController from "../Controller/User.Controller";
import UserModel from "../Models/UserModel";
import { GlobalStyles, Colors } from "../Styles/Theme";

export default function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUri, setImageUri] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleRegister() {
        if (!username || !email || !password) {
            return Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
        }

        setLoading(true);

        try {
            const newUser = new UserModel({
                username: username,
                email: email,
                password: password,
                userImage: imageUri
            });

            await UserController.createUser(newUser);

            Alert.alert("Sucesso!", "Conta criada. Faça login para continuar.");
            navigation.goBack();

        } catch (error) {
            Alert.alert("Erro no Cadastro", error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={[GlobalStyles.container, { justifyContent: 'center' }]}>
            <LoadingOverlay visible={loading} message="Criando conta..." />

            <Text style={GlobalStyles.title}>Crie sua Conta</Text>
            <Text style={{ color: Colors.textSecondary, textAlign: 'center', marginBottom: 20 }}>
                Junte-se à comunidade GameHit
            </Text>

            <View style={{ marginBottom: 20 }}>
                <InputImageComponent 
                    label="Foto de Perfil"
                    onChange={(file) => setImageUri(file.uri)} 
                />
            </View>

            <InputTextComponent
                label="Nome de Usuário"
                value={username}
                onChangeText={setUsername}
                placeholder="Ex: Player1"
            />

            <InputTextComponent
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="email@exemplo.com"
            />

            <InputTextComponent
                label="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                placeholder="******"
            />

            <View style={{ marginTop: 20 }}>
                <ButtonComponent
                    label="Cadastrar"
                    pressFunction={handleRegister}
                />
            </View>

            <TouchableOpacity 
                style={{ marginTop: 20, alignItems: 'center', padding: 10 }}
                onPress={() => navigation.goBack()}
            >
                <Text style={{ color: Colors.textSecondary }}>
                    Já tem uma conta? <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Faça Login</Text>
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}