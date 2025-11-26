import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Colors } from './Styles/Theme';
import { Text } from 'react-native';

import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import EditUserScreen from './Screens/EditUserScreen';
import GamesScreen from './Screens/GamesScreen';
import AddGameScreen from './Screens/AddGameScreen';
import EditGameScreen from './Screens/EditGameScreen';
import GameDetailScreen from './Screens/GameDetailScreen';
import GamesListScreen from './Screens/GamesListScreen';
import GameRegisterScreen from './Screens/GameRegisterScreen';
import RegisterListScreen from './Screens/RegisterListScreen';
import UpdateGameRegisterScreen from './Screens/UpdateGameRegisterScreen';

import { AuthHelper } from './utils/AuthHelper';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      AuthHelper.retrieveToken();
      if ((await AuthHelper.getAccessToken()) && !AuthHelper.isTokenExpired()) {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Login"}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="User" component={EditUserScreen} />
          <Stack.Screen name="GamesScreen" component={GamesScreen} />
          <Stack.Screen name="AddGameScreen" component={AddGameScreen} />
          <Stack.Screen name="EditGameScreen" component={EditGameScreen} />
          <Stack.Screen name="GameDetailScreen" component={GameDetailScreen} />
          <Stack.Screen name="GamesListScreen" component={GamesListScreen} />
          <Stack.Screen name="GameRegisterScreen" component={GameRegisterScreen} />
          <Stack.Screen name="RegisterListScreen" component={RegisterListScreen} />
          <Stack.Screen name="UpdateGameRegisterScreen" component={UpdateGameRegisterScreen} />
        </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}