import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Criação do contexto de autenticação
export const AuthContext = createContext();

// Ações para o reducer
const actionTypes = {
  RESTORE_TOKEN: 'RESTORE_TOKEN',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
};

// Função reducer para gerenciar o estado de autenticação
const authReducer = (prevState, action) => {
  switch (action.type) {
    case actionTypes.RESTORE_TOKEN:
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case actionTypes.SIGN_IN:
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      };
    case actionTypes.SIGN_OUT:
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
  }
};

// Componente de provedor de autenticação
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
  });

  useEffect(() => {
    // Tenta recuperar o token do usuário ao iniciar o app
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restaurar token falhou
      }
      // Após tentar recuperar o token, atualiza o estado
      dispatch({ type: actionTypes.RESTORE_TOKEN, token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = {
    signIn: async data => {
      // Implemente a lógica de login aqui
      dispatch({ type: actionTypes.SIGN_IN, token: 'dummy-auth-token' });
    },
    signOut: () => dispatch({ type: actionTypes.SIGN_OUT }),
    signUp: async data => {
      // Implemente a lógica de registro aqui
      dispatch({ type: actionTypes.SIGN_IN, token: 'dummy-auth-token' });
    },
    userToken: state.userToken,
    isLoading: state.isLoading,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
