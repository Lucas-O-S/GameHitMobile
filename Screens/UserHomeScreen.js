import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from "../utils/AuthContext";
import { GlobalStyles, Colors } from "../Styles/Theme";
import AuthHelper from "../utils/AuthHelper";

export default function UserHomeScreen({ navigation }) {
    const { signOut, user } = useContext(AuthContext);

    function handleEditProfile() {
        navigation.navigate("EditProfile", { userId: user?.id }); 
    }

    return (
        <View style={GlobalStyles.container}>
        <View style={styles.header}>
            <Text style={GlobalStyles.title}>Bem-vindo, Player</Text>
            <Text style={styles.subtitle}>O que vamos jogar hoje?</Text>
        </View>

        <View style={styles.menuContainer}>
            <TouchableOpacity
            style={[styles.card, { backgroundColor: Colors.surface }]}
            onPress={() => navigation.navigate("GamesList")}
            >
            <Ionicons name="game-controller" size={40} color={Colors.primary} />
            <Text style={styles.cardText}>Biblioteca de Jogos</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={[styles.card, { backgroundColor: Colors.surface }]}
            onPress={handleEditProfile}
            >
            <Ionicons name="person" size={40} color={Colors.secondary} />
            <Text style={styles.cardText}>Meu Perfil</Text>
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
            <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
        </View>
    );
    }

    const styles = StyleSheet.create({
    header: { marginBottom: 40, alignItems: 'center' },
    subtitle: { color: Colors.textSecondary, fontSize: 16 },
    menuContainer: { flex: 1, justifyContent: 'center' },
    card: {
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        alignItems: 'center',
        flexDirection: 'row',
        elevation: 3
    },
    cardText: {
        color: Colors.text,
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20
    },
    logoutButton: {
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.danger,
        alignItems: 'center'
    },
    logoutText: { color: Colors.danger, fontWeight: 'bold' }
});