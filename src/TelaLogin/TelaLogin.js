import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../../AuthProvider.js";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

const TelaLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      // Obtém os dados de usuário armazenados localmente
      const storedUsername = await AsyncStorage.getItem('username');
      const storedPassword = await AsyncStorage.getItem('password');

      // Verifica se os campos de nome de usuário e senha estão preenchidos
      if (!username || !password) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos');
        return;
      }

      // Verifica se os dados de login correspondem aos dados armazenados localmente
      if (username === storedUsername && password === storedPassword) {
        // Login bem-sucedido
        Alert.alert('Sucesso', 'Login bem-sucedido');
        // Você pode navegar para a próxima tela aqui
      } else {
        // Nome de usuário ou senha incorretos
        Alert.alert('Erro', 'Nome de usuário ou senha incorretos');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Ocorreu um erro ao fazer login');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome de usuário"
        onChangeText={setUsername}
        value={username}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate('TelaRegistrar')}>
        Criar conta
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  link: {
    marginTop: 10,
    color: "blue",
  },
});

export default TelaLogin;
