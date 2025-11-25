import React, { useEffect, useState } from "react";
import { View, FlatList, Alert, Text } from "react-native";
import ListItemComponent from "../Components/ListItemComponent";
import LoadingOverlay from "../Components/LoadingOverlay";
import IconButtonComponent from "../Components/IconButtonComponent";
import UserController from "../Controller/User.Controller";
import { GlobalStyles, Colors } from "../Styles/Theme";

export default function UsersListScreen({ navigation }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    async function loadUsers() {
        setLoading(true);
        try {
            const res = await UserController.findAllUsers();
            setUsers(res);
        } catch (e) {
            Alert.alert("Erro", e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const unsub = navigation.addListener("focus", loadUsers);
        return unsub;
    }, []);

    return (
        <View style={GlobalStyles.container}>
            <LoadingOverlay visible={loading} />

            <FlatList
                data={users}
                keyExtractor={(u) => String(u.id)}
                renderItem={({ item }) => (
                    <ListItemComponent
                        title={item.username}
                        subtitle={item.email}
                        // Personalize seu ListItemComponent para aceitar cores se necessário
                        onPress={() => navigation.navigate("UserDetail", { id: item.id })}
                    />
                )}
                ListEmptyComponent={<Text style={{color: Colors.textSecondary, textAlign:'center', marginTop: 50}}>Nenhum usuário encontrado</Text>}
            />

            {/* FAB para Adicionar Usuário */}
            <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                <IconButtonComponent 
                    iconName="person-add" 
                    size={24} 
                    color="#FFF" 
                    style={{ backgroundColor: Colors.primary, borderRadius: 30, width: 60, height: 60, elevation: 5 }}
                    onPress={() => navigation.navigate("AddUser")}
                />
            </View>
        </View>
    );
}