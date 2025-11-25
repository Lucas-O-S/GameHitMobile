import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../Styles/Theme";

import GamesListScreen from "../Screens/GamesListScreen";
import GameDetailScreen from "../Screens/GameDetailScreen";
import AddGameScreen from "../Screens/AddGameScreen";
import EditGameScreen from "../Screens/EditGameScreen";

import UsersListScreen from "../Screens/UsersListScreen";
import UserDetailScreen from "../Screens/UserDetailScreen";
import AddUserScreen from "../Screens/AddUserScreen";
import EditUserScreen from "../Screens/EditUserScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack de Jogos (CRUD)
function GameStack() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="GamesList" component={GamesListScreen} options={{ title: "Gerenciar Jogos" }}/>
        <Stack.Screen name="AddGame" component={AddGameScreen} options={{ title: "Novo Jogo" }}/>
        <Stack.Screen name="GameDetail" component={GameDetailScreen} options={{ title: "Detalhes" }}/>
        {/* Adicione EditGameScreen aqui */}
        </Stack.Navigator>
    );
}

// Stack de Usuários (CRUD)
function UserStack() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="UsersList" component={UsersListScreen} options={{ title: "Gerenciar Usuários" }}/>
        {/* Adicione UserDetail, AddUser, EditUser aqui */}
        </Stack.Navigator>
    );
    }

export default function AdminNavigator() {
    return (
        <Tab.Navigator 
        screenOptions={{
            headerShown: false,
            tabBarStyle: { backgroundColor: Colors.surface, borderTopColor: Colors.border },
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.textSecondary,
        }}
        >
        <Tab.Screen 
            name="JogosTab" 
            component={GameStack} 
            options={{ tabBarLabel: 'Jogos', tabBarIcon: ({color}) => <Ionicons name="game-controller" size={24} color={color} /> }}
        />
        <Tab.Screen 
            name="UsuariosTab" 
            component={UserStack} 
            options={{ tabBarLabel: 'Usuários', tabBarIcon: ({color}) => <Ionicons name="people" size={24} color={color} /> }}
        />
        </Tab.Navigator>
    );
    }

    const screenOptions = {
    headerStyle: { backgroundColor: Colors.surface },
    headerTintColor: Colors.text,
    contentStyle: { backgroundColor: Colors.background }
};