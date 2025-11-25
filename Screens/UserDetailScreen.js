import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import LoadingOverlay from "../Components/LoadingOverlay";
import ButtonComponent from "../Components/ButtonComponent";
import UserController from "../Controller/User.Controller";
import { GlobalStyles, Colors } from "../Styles/Theme";

export default function UserDetailScreen({ route, navigation }) {
    const { id } = route.params;
    const [userModel, setUserModel] = useState(null);
    const [loading, setLoading] = useState(true);

    async function load() {
        try {
            const res = await UserController.findOneUser(id);
            setUserModel(res);
        } catch (e) {
            Alert.alert("Erro", "Não foi possível carregar usuário.");
            navigation.goBack();
        } finally {
            setLoading(false);
        }
    }

    async function remove() {
        Alert.alert("Atenção", "Remover este usuário permanentemente?", [
            { text: "Cancelar" },
            {
                text: "Remover",
                style: "destructive",
                onPress: async () => {
                    try {
                        await UserController.deleteUser(id);
                        Alert.alert("Sucesso", "Usuário removido.");
                        navigation.goBack();
                    } catch (e) {
                        Alert.alert("Erro", e.message);
                    }
                },
            },
        ]);
    }

    useEffect(() => { load() }, []);

    if (loading || !userModel) return <LoadingOverlay visible={true} />;

    return (
        <View style={GlobalStyles.container}>
            {/* Foto se tiver (implementar lógica de visualização se retornar do backend) */}
            <View style={{alignItems: 'center', marginBottom: 20}}>
                <View style={{width: 100, height: 100, borderRadius: 50, backgroundColor: Colors.surface, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 30, color: Colors.text}}>{userModel.username.charAt(0).toUpperCase()}</Text>
                </View>
            </View>

            <Text style={[GlobalStyles.title, {marginBottom: 5}]}>{userModel.username}</Text>
            <Text style={{ color: Colors.textSecondary, textAlign: 'center', marginBottom: 30 }}>{userModel.email}</Text>

            <ButtonComponent
                label="Editar Usuário"
                pressFunction={() => navigation.navigate("EditUser", { user: userModel })}
            />

            <TouchableOpacity
                style={{ marginTop: 20, padding: 15, backgroundColor: Colors.danger, borderRadius: 8, alignItems: 'center' }}
                onPress={remove}
            >
                <Text style={{ color: '#fff', fontWeight: "bold" }}>Excluir Usuário</Text>
            </TouchableOpacity>
        </View>
    );
}