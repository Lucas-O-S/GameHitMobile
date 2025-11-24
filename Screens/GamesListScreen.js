import React, { useEffect, useState, useContext } from "react";
import { View, FlatList, Alert, Text } from "react-native";
import ListItemComponent from "../Components/ListItemComponent";
import LoadingOverlay from "../Components/LoadingOverlay";
import IconButtonComponent from "../Components/IconButtonComponent";
import GameController from "../Controller/Game.Controller";
import { GlobalStyles, Colors } from "../Styles/Theme";
import { AuthContext } from "../utils/AuthContext";

export default function GamesListScreen({ navigation }) {
    const { user } = useContext(AuthContext);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);

    async function loadGames() {
      setLoading(true);
      try {
          const data = await GameController.findAllGames();
          setGames(data);
      } catch (e) {
          Alert.alert("Erro", e.message);
      } finally {
          setLoading(false);
      }
    }

    useEffect(() => {
      const unsub = navigation.addListener("focus", loadGames);
      return unsub;
    }, []);

    return (
      <View style={GlobalStyles.container}>
        <LoadingOverlay visible={loading} />

        <FlatList
          data={games}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => (
            <ListItemComponent
              title={item.name}
              subtitle={item.firstReleaseDate}
              onPress={() => navigation.navigate("GameDetail", { id: item.id })}
            />
          )}
          ListEmptyComponent={<Text style={{color: Colors.textSecondary, textAlign: 'center', marginTop: 50}}>Nenhum jogo encontrado</Text>}
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