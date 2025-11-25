import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UserHomeScreen from "../Screens/UserHomeScreen";

const Stack = createNativeStackNavigator();

export default function UserNavigator() {
    return (
        <Stack.Navigator>
        <Stack.Screen name="UserHome" component={UserHomeScreen} options={{ title: "Bem-vindo" }} />
        </Stack.Navigator>
    );
}