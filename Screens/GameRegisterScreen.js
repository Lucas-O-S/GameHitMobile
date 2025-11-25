import React, { useState, useCallback } from "react";
import { View, Text, Alert, Image, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import LoadingOverlay from "../Components/LoadingOverlay";
import ComboBoxComponent from "../Components/ComboBoxComponent";

import { GlobalStyles, Colors } from "../Styles/Theme";
import { AuthHelper } from "../utils/AuthHelper";
import GameStatusController from "../Controller/GameStatus.Controller";

export default function GameRegisterScreen({ route, navigation }) {

    const { game } = route.params;

    const [userId, setUserId] = useState(null);
    const [gameStatusId, setGameStatusId] = useState(null);
    const [gameStatusList, setGameStatusList] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            let timeout;

            async function loadData() {
                await load();
                timeout = setTimeout(loadData, 60000);
            }

            loadData();

            return () => clearTimeout(timeout);
        }, [])
    );

    async function load() {
        setLoading(true);

        try {
            const id = await AuthHelper.getUserIdFromToken();
            setUserId(id);

            const result = await GameStatusController.findAll();

            const formatted = result.map(s => ({
                label: s.name,
                value: s.id
            }));

            setGameStatusList(formatted);

        } catch {
            Alert.alert("Erro", "Falha ao carregar dados.");
            navigation.goBack();
        }

        finally {
            setLoading(false);
        }
    }

    if (loading || !game) return <LoadingOverlay visible={true} />;

    return (
        <ScrollView contentContainerStyle={GlobalStyles.container}>
            {game.cover ? (
                <Image
                    source={{ uri: game.cover }}
                    style={{ width: "100%", height: 250, borderRadius: 12, marginBottom: 20 }}
                    resizeMode="cover"
                />
            ) : (
                <View style={{ width: "100%", height: 200, backgroundColor: Colors.surface, justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                    <Text style={{ color: Colors.textSecondary }}>Sem Capa</Text>
                </View>
            )}

            <Text style={GlobalStyles.title}>{game.name}</Text>

            <View style={{ backgroundColor: Colors.surface, padding: 15, borderRadius: 8, marginBottom: 20 }}>
                <Text style={{ color: Colors.textSecondary, marginBottom: 5 }}>Status</Text>

                <ComboBoxComponent
                    label=""
                    items={gameStatusList}
                    onChange={(v) => setGameStatusId(v)}
                    placeHolder={{ label: "Selecione o status", value: null }}
                />

                <Text style={{ marginTop: 10, color: Colors.textSecondary }}>
                    Selecionado: {gameStatusId || "Nenhum"}
                </Text>
            </View>
        </ScrollView>
    );
}
