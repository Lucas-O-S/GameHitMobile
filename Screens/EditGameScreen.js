import React, { useState } from "react";
import { View, ScrollView, Alert, Text } from "react-native";
import InputTextComponent from "../Components/InputTextComponent";
import InputDateComponent from "../Components/InputDateComponent";
import InputImageComponent from "../Components/InputImageComponent";
import ButtonComponent from "../Components/ButtonComponent";
import LoadingOverlay from "../Components/LoadingOverlay";
import GameController from "../Controller/Game.Controller";
import GameModel from "../Models/GameModel";
import { GlobalStyles, Colors } from "../Styles/Theme";
import { convertDmyToStandardDate, convertStandardDateToDmy } from "../utils/DateConverter"; 

export default function EditGameScreen({ route, navigation }) {
    const { game } = route.params;

    const [name, setName] = useState(game.name);
    
    const [date, setDate] = useState(convertStandardDateToDmy(game.firstReleaseDate));
    
    const [genreId, setGenreId] = useState(String(game.genreId));
    const [imageUri, setImageUri] = useState(null);
    const [loading, setLoading] = useState(false);

    async function save() {
        if (!name || !date || !genreId) {
            return Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
        }

        setLoading(true);

        try {
            const standardDate = convertDmyToStandardDate(date);

            const gameToUpdate = new GameModel({
                id: game.id,
                name: name,
                firstReleaseDate: standardDate,
                genreId: parseInt(genreId)
            });

            await GameController.updateGame(gameToUpdate, imageUri);

            Alert.alert("Sucesso", "Jogo atualizado com sucesso!");
            navigation.goBack();

        } catch (error) {
            Alert.alert("Erro ao atualizar", error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={GlobalStyles.container}>
            <LoadingOverlay visible={loading} message="Salvando alterações..." />

            <Text style={{color: Colors.textSecondary, marginBottom: 20, textAlign: 'center'}}>
                Editando ID: {game.id}
            </Text>

            <InputImageComponent 
                label="Alterar Capa"
                value={game.cover ? `data:image/jpeg;base64,${game.cover}` : null}
                onChange={(file) => setImageUri(file.uri)} 
            />

            <InputTextComponent 
                label="Nome do Jogo" 
                value={name} 
                onChangeText={setName} 
            />

            <InputDateComponent 
                label="Data de Lançamento" 
                value={date} 
                onChangeText={setDate}
                tipo="calendar" 
            />

            <InputTextComponent 
                label="ID do Gênero" 
                value={genreId} 
                onChangeText={setGenreId} 
                keyboardType="numeric"
            />

            <View style={{ marginTop: 20 }}>
                <ButtonComponent 
                    label="Salvar Alterações" 
                    pressFunction={save} 
                />
            </View>
        </ScrollView>
    );
}