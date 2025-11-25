import React, { useEffect, useState, useContext, useCallback } from "react";
import { View, FlatList, Alert, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import LoadingOverlay from "../Components/LoadingOverlay";
import IconButtonComponent from "../Components/IconButtonComponent";

import GameController from "../Controller/Game.Controller";

import { GlobalStyles, Colors } from "../Styles/Theme";
import { AuthContext } from "../utils/AuthContext";
import { ListItemComponent } from "../Components/ListItemComponent";

export default function GamesListScreen({ navigation }) {
    const { user } = useContext(AuthContext);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);


    useFocusEffect(
        useCallback(() => {

            async function loadData() {

                await loadGames();

            }

            loadData();


        }, [])
    );

    async function loadGames() {
        setLoading(true);
        try {
            const data = await GameController.findAllGames();
            console.log("resposta: ", data)
            setGames(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    return (
      <View style={GlobalStyles.container}>
        <LoadingOverlay visible={loading} />

      <FlatList
        data={games}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item, index }) => (
          <ListItemComponent
            onPress={() => navigation.navigate("GameDetailScreen", { id: item.id })}
            content={() => (
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  {item.name}
                </Text>

                <Text style={{ color: '#555' }}>
                  {item.firstReleaseDate}
                </Text>

              </View>
            )}
            showEditButton={false}
            showDeleteButton={false}
          />

          )}

          ListEmptyComponent={
            <Text style={{color: Colors.textSecondary, textAlign: 'center', marginTop: 50}}>
              Nenhum jogo encontrado
            </Text>
          }
        />


        {user?.roleId === 1 && (
            <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
              <IconButtonComponent 
                  iconName="add" 
                  size={30} 
                  color="#FFF" 
                  style={{ backgroundColor: Colors.primary, borderRadius: 30, width: 60, height: 60, elevation: 5 }}
                  onPress={() => navigation.navigate("AddGame")}
              />
            </View>
        )}
      </View>
    );
}