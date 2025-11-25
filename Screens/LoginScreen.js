import React, { useState, useContext } from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import InputTextComponent from "../Components/InputTextComponent";
import ButtonComponent from "../Components/ButtonComponent";
import LoadingOverlay from "../Components/LoadingOverlay";
import { GlobalStyles, Colors } from "../Styles/Theme";
import UserController from "../Controller/User.Controller";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        if (!email || !password) return Alert.alert("Atenção", "Preencha tudo");

        setLoading(true);
        try {
            await UserController.login(email, password);

            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        } catch (error) {
            Alert.alert("Erro", error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={[GlobalStyles.container, { justifyContent: 'center' }]}>
            <LoadingOverlay visible={loading} message="Entrando..." />
            
            <Text style={GlobalStyles.title}>GameHit</Text>
            
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
                secureTextEntry
                placeholder="******"
            />

            <View style={{ marginTop: 20 }}>
                <ButtonComponent label="Acessar" pressFunction={handleLogin} />
            </View>

            <TouchableOpacity style={{ marginTop: 20, alignItems: 'center' }} onPress={() => navigation.navigate("Register")}>
                <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Criar conta</Text>
            </TouchableOpacity>
        </View>
    );
}