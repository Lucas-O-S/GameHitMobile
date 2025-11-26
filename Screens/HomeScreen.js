import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AuthHelper } from "../utils/AuthHelper";
import { GlobalStyles, Colors } from "../Styles/Theme";
import UserController from "../Controller/User.Controller";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
    const [userName, setUserName] = useState("Player");
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);

    useFocusEffect(
            useCallback(() => {
          async function loadData() {
            await firstLoad();
          }
    
          loadData();
            }, [])
        );
    
      async function firstLoad() {
        setLoading(true);
        try {
          const id = await AuthHelper.getUserIdFromToken();
          setUserId(id);
            const user = await UserController.findOneUser(id);
            setUserName(user.username);
        } catch (error) {
          console.log(error);
          setRegisters([]);
        } finally {
          setLoading(false);
        }
    }

    async function handleSignOut() {
        try {
            await AuthHelper.clearAccessToken();

            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.log("Erro ao sair:", error);
        }
    }

    return (
        <View style={GlobalStyles.container}>
        <View style={styles.header}>
            <Text style={GlobalStyles.title}>Bem-vindo, {userName}</Text>
            <Text style={styles.subtitle}>O que vamos jogar hoje?</Text>
        </View>

        <View style={styles.menuContainer}>
            <TouchableOpacity
            style={[styles.card, { backgroundColor: Colors.surface }]}
            onPress={() => navigation.navigate("GamesListScreen")}
            >
            <Ionicons name="game-controller" size={40} color={Colors.primary} />
            <Text style={styles.cardText}>Biblioteca de Jogos</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={[styles.card, { backgroundColor: Colors.surface }]}
            onPress={() => navigation.navigate("RegisterListScreen")}
            >
            <Ionicons name="book" size={40} color={Colors.primary} />
            <Text style={styles.cardText}>Meus de Registros de Jogos</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.card, { backgroundColor: Colors.surface }]}
                onPress={() => navigation.navigate("User", {userId: null})}
            >
            <Ionicons name="person" size={40} color={Colors.secondary} />
            <Text style={styles.cardText}>Meu Perfil</Text>
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
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