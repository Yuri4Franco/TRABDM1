import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider, { AuthContext } from './AuthProvider';
import TelaRegistrar from './src/TelaRegistrar/TelaRegistrar';
import TelaLogin from './src/TelaLogin/TelaLogin';
import Home from './src/Home/Home';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='CheckAuth'>
          <Stack.Screen name="CheckAuth" component={CheckAuth} />
          <Stack.Screen name="TelaRegistrar" component={TelaRegistrar} />
          <Stack.Screen name="TelaLogin" component={TelaLogin} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const CheckAuth = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    // Exibir um componente de carregamento enquanto verifica a autenticação
    return null;
  }

  // Se o usuário estiver autenticado, navegue para a tela Home, caso contrário, para a tela de login
  return userToken ? <Home /> : <TelaLogin />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});