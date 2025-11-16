import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import RegisterScreen from './Screens/RegisterScreen';
import UserScreen from './Screens/UserScreen';
import CartScreen from './Screens/CartScreen';
import ProductListScreen from './Screens/ProductListScreen';
import OrderCreateScreen from './Screens/OrderCreateScreen';
import OrderItemCreateScreen from './Screens/OrderItemCreateScreen';
import UserManagementScreen from './Screens/UserManagementScreen';
import { AuthHelper } from './utils/AuthHelper';

const Stack = createNativeStackNavigator();
export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    async function checkLoginStatus() {
      
      const token = await AuthHelper.getAccessToken();
 
      if (token && !AuthHelper.isTokenExpired()) 
        setIsLoggedIn(true);
      
      setIsLoading(false);

    };

    checkLoginStatus();
    
  }, []);

  if (isLoading) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Home"}> {/* colocar a login como a inicial se não tiver logado */}
              <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
