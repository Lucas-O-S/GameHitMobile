import React, { useEffect, useState, useContext, useCallback } from "react";
import { View, Text, Alert, Image, ScrollView, TouchableOpacity } from "react-native";
import LoadingOverlay from "../Components/LoadingOverlay";
import ButtonComponent from "../Components/ButtonComponent";
import GameController from "../Controller/Game.Controller";
import { GlobalStyles, Colors } from "../Styles/Theme";
import { convertStandardDateToDmy } from "../utils/DateConverter";
import { useFocusEffect } from "@react-navigation/native";


export default function GameDetailScreen({ route, navigation }) {
    
    const { id } = route.params;
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);


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
            const res = await GameController.findOneGame(id);
            setGame(res); 
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar o jogo.");
            navigation.goBack();
        } finally {
            setLoading(false);
        }
    }

    if (loading || !game) return <LoadingOverlay visible={true} />;


    return (
        <ScrollView contentContainerStyle={GlobalStyles.container}>
            {/* Imagem */}
            {game.cover ? (
                <Image
                    source={{ uri: game.cover }} 
                    style={{ width: "100%", height: 250, borderRadius: 12, marginBottom: 20 }}
                    resizeMode="cover"
                />
            ) : (
                <View style={{width: "100%", height: 200, backgroundColor: Colors.surface, justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                    <Text style={{color: Colors.textSecondary}}>Sem Capa</Text>
                </View>
            )}

            <Text style={GlobalStyles.title}>{game.name}</Text>
            
            <View style={{backgroundColor: Colors.surface, padding: 15, borderRadius: 8, marginBottom: 20}}>
                <Text style={{ color: Colors.textSecondary, marginBottom: 5 }}>Lançamento</Text>
                <Text style={{ color: Colors.text, fontSize: 16 }}>{convertStandardDateToDmy(game.firstReleaseDate)}</Text>
                
                {game.genre && (
                    <>
                        <Text style={{ color: Colors.textSecondary, marginTop: 15, marginBottom: 5 }}>Gênero</Text>
                        <Text style={{ color: Colors.primary, fontSize: 16, fontWeight: 'bold' }}>{game.genre.name}</Text>
                    </>
                )}

            </View>

            <ButtonComponent
                label={"Criar Registro deste Jogo"}
                pressFunction={() => navigation.navigate("GameRegisterScreen", { game })}
            />

        </ScrollView>
    );
}