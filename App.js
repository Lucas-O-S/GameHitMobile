import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';

import { AuthProvider, AuthContext } from './utils/AuthContext';
import AuthNavigator from './Navigation/AuthNavigator';
import AdminNavigator from './Navigation/AdminNavigator';
import UserNavigator from './Navigation/UserNavigator';
import { Colors } from './Styles/Theme';

function Routes() {
  const { signed, user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{flex:1, backgroundColor: Colors.background, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!signed) return <AuthNavigator />;
  
  // Role 1 = Admin, Role 2 = User
  return user?.roleId === 1 ? <AdminNavigator /> : <UserNavigator />;
}

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar style="light" backgroundColor={Colors.background} />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}