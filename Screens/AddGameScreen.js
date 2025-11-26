import React, { useState } from "react";
import { View, Alert, Text } from "react-native";
import InputTextComponent from "../Components/InputTextComponent";
import InputDateComponent from "../Components/InputDateComponent";
import ButtonComponent from "../Components/ButtonComponent";
import LoadingOverlay from "../Components/LoadingOverlay";
import GameController from "../Controller/Game.Controller";
import GameModel from "../Models/GameModel";
import { GlobalStyles, Colors } from "../Styles/Theme";
import { convertDmyToStandardDate } from "../utils/DateConverter";
import InputImageComponent from "../Components/InputImageComponent";

export default function GamesListScreen({ navigation }) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [genreId, setGenreId] = useState("");
    const [imageUri, setImageUri] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleAddGame() {
        if (!name || !date || !genreId) {
            return Alert.alert("Atenção", "Por favor, preencha todos os campos obrigatórios.");
        }

        setLoading(true);

        try{
            const standartDate = convertDmyToStandardDate(date);

            const newGame = new GameModel({
                name: name,
                firstReleaseDate: standartDate,
                genreId: parseInt(genreId),
            });

            await GameController.createGame(newGame, imageUri);

            Alert.alert("Sucesso", "Jogo adicionado com sucesso!");
            navigation.goBack();
        } catch (e) {
            Alert.alert("Erro ao criar", e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={GlobalStyles.container}>
        <LoadingOverlay visible={loading} message="Adicionando jogo..." />

        <Text style={GlobalStyles.title}>Novo Jogo</Text>

        <InputImageComponent
            label="Capa do Jogo"
            onChange={(file) => setImageUri(file.uri)}
        />

        <InputTextComponent
            label="Nome do Jogo"
            value={name}
            onChangeText={setName}
            placeholder="Digite o nome do jogo"
        />

        <InputDateComponent
            label="Data de Lançamento"
            value={date}
            onChangeText={setDate}
            tipo="calendar"
            placeholder="DD/MM/AAAA"
        />

        <InputTextComponent
            label="ID do Gênero"
            value={genreId}
            onChangeText={setGenreId}
            keyboardType="numeric"
            placeholder="Ex.: 1"
        />

        <View style={{ marginTop: 20 }}>
            <ButtonComponent
                label="Adicionar Jogo"
                pressFunction={handleAddGame} />
        </View>
    </ScrollView>
    );
}