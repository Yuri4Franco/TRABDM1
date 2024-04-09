import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

const TelaRegistrar = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
          const storedUser = await AsyncStorage.getItem('user');
          const { username: storedUsername, password: storedPassword } = JSON.parse(storedUser || '{}');
      
          if (!username || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
          }
      
          if (username === storedUsername && password === storedPassword) {
            await AsyncStorage.setItem('userToken', 'authenticated');
            signIn({ username });
          } else {
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
            <Button title="Registrar" onPress={handleRegister} />
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
});

export default TelaRegistrar;
