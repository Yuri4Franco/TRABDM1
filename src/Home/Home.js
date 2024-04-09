import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../../AuthProvider';
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const { userToken, signOut } = useContext(AuthContext);

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {userToken ? (
        <>
          <Text>Bem-vindo!</Text>
          <Text>Usuário logado: {userToken}</Text>
          <Button title="Sair" onPress={signOut} />
        </>
      ) : (
        <>
          <Text>Você não está logado.</Text>
          <Button title="Fazer login" onPress={() => {navigation.navigate('TelaLogin')  }} />
        </>
      )}
    </View>
  );
};

export default Home;