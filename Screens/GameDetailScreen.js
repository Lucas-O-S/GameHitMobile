import React, { useEffect, useState, useContext, useCallback } from "react";
import { View, Text, Alert, Image, ScrollView, TouchableOpacity } from "react-native";
import LoadingOverlay from "../Components/LoadingOverlay";
import ButtonComponent from "../Components/ButtonComponent";
import GameController from "../Controller/Game.Controller";
import { GlobalStyles, Colors } from "../Styles/Theme";
import { AuthContext } from "../utils/AuthContext";
import { convertStandardDateToDmy } from "../utils/DateConverter";
import { useFocusEffect } from "@react-navigation/native";


export default function GameDetailScreen({ route, navigation }) {
    
    const { id } = route.params;
    const { user } = useContext(AuthContext);
    const [game, setGame] = useState(null);
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

    const isAdmin = user?.roleId === 1;

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

            {/* Botões de Ação (Apenas Admin) */}
            {isAdmin && (
                <View>
                    <ButtonComponent
                        label="Editar Jogo"
                        pressFunction={() => navigation.navigate("EditGame", { game })} // Passando objeto game
                    />

                    <TouchableOpacity
                        style={{ marginTop: 15, padding: 15, backgroundColor: Colors.danger, borderRadius: 8, alignItems: 'center' }}
                        onPress={deleteGame}
                    >
                        <Text style={{ color: '#fff', fontWeight: "bold" }}>Excluir Jogo</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
}