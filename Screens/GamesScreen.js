import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import GameController from '../Controller/Game.Controller';
import { ListItemComponent } from '../Components/ListItemComponent';
import ImageComponent from '../Components/ImageComponent';
import IconButtonComponent from '../Components/IconButtonComponent';
import LoadingOverlay from '../Components/LoadingOverlay';
import { convertStandardDateToDmy } from '../utils/DateConverter';

export default function HomeScreen({ navigation }) {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const isFocused = useIsFocused();

    async function loadGames() {
        setLoading(true);
        try {
            const data = await GameController.findAllGames();
            setGames(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isFocused) loadGames();
    }, [isFocused]);

    // Função que renderiza o conteúdo interno do ListItem
    const renderGameContent = (game) => (
        <View style={styles.itemRow}>
            <ImageComponent 
                image64={game.cover} 
                style={{ width: 60, height: 60, marginRight: 10 }} 
            />
            <View>
                <Text style={styles.gameTitle}>{game.name}</Text>
                <Text style={styles.gameSubtitle}>
                    {convertStandardDateToDmy(game.firstReleaseDate)}
                </Text>
                {game.genre && <Text style={styles.gameGenre}>{game.genre.name}</Text>}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <LoadingOverlay visible={loading} message="Buscando jogos..." />
            
            <FlatList 
                data={games}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <ListItemComponent 
                        content={() => renderGameContent(item)}
                        showDeleteButton={true}
                        deleteFunction={() => handleDelete(item.id)}
                    />
                )}
                ListEmptyComponent={<Text style={styles.empty}>Nenhum jogo cadastrado</Text>}
            />

            {/* Botão Flutuante para Adicionar */}
            <View style={styles.fabContainer}>
                <IconButtonComponent 
                    iconName="add" 
                    size={30} 
                    color="#fff" 
                    style={styles.fab}
                    onPress={() => navigation.navigate("AddGame")}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    itemRow: { flexDirection: 'row', alignItems: 'center' },
    gameTitle: { fontWeight: 'bold', fontSize: 16 },
    gameSubtitle: { color: '#666', fontSize: 12 },
    gameGenre: { color: '#8257E5', fontSize: 12, fontWeight: 'bold' },
    empty: { textAlign: 'center', marginTop: 50, color: '#999' },
    fabContainer: { position: 'absolute', bottom: 20, right: 20 },
    fab: { backgroundColor: '#007bff', borderRadius: 30, width: 60, height: 60, elevation: 5 }
});