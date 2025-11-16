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
    const checkLoginStatus = async () => {
      const token = await AuthHelper.getAccessToken();
      if (token && !AuthHelper.isTokenExpired()) {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Login"}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="ProductListScreen" component={ProductListScreen} />
        <Stack.Screen name="OrderCreateScreen" component={OrderCreateScreen} />
        <Stack.Screen name="OrderItemCreateScreen" component={OrderItemCreateScreen} />
        <Stack.Screen name="UserManagementScreen" component={UserManagementScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
