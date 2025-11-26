import React, { useState, useCallback } from "react";
import { View, Text, Alert, Image, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import LoadingOverlay from "../Components/LoadingOverlay";
import { ComboBoxComponent } from "../Components/ComboBoxComponent";

import { GlobalStyles, Colors } from "../Styles/Theme";
import { AuthHelper } from "../utils/AuthHelper";

import GameStatusController from "../Controller/GameStatus.Controller";
import RegisterController from "../Controller/Register.Controller";

import InputDateComponent from "../Components/InputDateComponent";
import InputTextComponent from "../Components/InputTextComponent";
import ButtonComponent from "../Components/ButtonComponent";
import RegisterModel from "../Models/RegisterModel";
import GameStatusModel from "../Models/GameStatus.model";

export default function GameRegisterScreen({ route, navigation }) {

    const { game } = route.params;

    const [userId, setUserId] = useState(null);
    const [gameStatusId, setGameStatusId] = useState(null);
    const [gameStatusList, setGameStatusList] = useState([]);
    const [loading, setLoading] = useState(true);

    const [review, setReview] = useState("");
    const [completedDate, setCompletedDate] = useState("");
    const [startedDate, setStartedDate] = useState("");
    const [personalRating, setPersonalRating] = useState("");

    useFocusEffect(
        useCallback(() => {
            async function loadData() {
                await load();
            }
            loadData();
        }, [])
    );

    async function load() {
        setLoading(true);

        try {
            const id = await AuthHelper.getUserIdFromToken();
            setUserId(id);

            const result = await GameStatusController.findAll();

            setGameStatusList(result);

            console.log("Status de jogo: ", JSON.stringify(result[0].name));

        } catch {
            Alert.alert("Erro", "Falha ao carregar dados.");
            navigation.goBack();
        }

        finally {
            setLoading(false);
        }
    }

    async function handleRegister() {
            if (!startedDate || !gameStatusId) {
                return Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
            }
    
            setLoading(true);
    
            try {
                const newRegister = new RegisterModel({
                    completedDate: completedDate,
                    startedDate: startedDate,
                    personalRating: personalRating,
                    gameStatus: new GameStatusModel({ id: gameStatusId }),
                    userId: userId,
                    game: game,
                    review: review
                });
    
                await RegisterController.create(newRegister);
    
                Alert.alert("Sucesso!", "Registro criado.");
                navigation.goBack();
    
            } catch (error) {
                Alert.alert("Erro no Registro", error.message);
            } finally {
                setLoading(false);
            }
        }

    if (loading || !game) return <LoadingOverlay visible={true} />;

    return (
        <View style={{ flex: 1, background: "#121214"}}>
        <ScrollView contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}>
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
                    items={gameStatusList.map(s => ({ label: s.name, value: s.id }))}
                    onChange={(v) => setGameStatusId(v)}
                    placeholder={{ label: "Selecione o status", value: null }}
                />

                <Text style={{ marginTop: 10, color: Colors.textSecondary }}>
                    Selecionado: {gameStatusId || "Nenhum"}
                </Text>
            </View>
            
            <InputDateComponent
                label={"Data de Início"}
                value={startedDate}
                onChangeText={setStartedDate}
                placeholder={"DD/MM/AAAA"}
            />

            <InputDateComponent
                label={"Data de Conclusão"}
                value={completedDate}
                onChangeText={setCompletedDate}
                placeholder={"DD/MM/AAAA"}
            />
            
            <InputTextComponent
                label={"Avaliação Pessoal"}
                value={personalRating}
                onChangeText={setPersonalRating}
                keyboardType="numeric"
                placeholder={"De 0 a 10, qual a sua nota?"}
            />

            <InputTextComponent
                label={"Review Pessoal"}
                value={review}
                onChangeText={setReview}
                placeholder={"Digite sua review pessoal"}
            />

            <View style={{ marginTop: 20 }}>
                <ButtonComponent
                    label={"Salvar Registro"}
                    pressFunction={handleRegister} />
            </View>
        </ScrollView>
        </View>
    );
}
