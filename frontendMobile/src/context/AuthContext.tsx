import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: 'administrador' | 'comum';
}

interface LoginCredentials {
  email: string;
  senha: string;
}

interface AuthContextData {
  user: Usuario | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signOut: () => void;
}

const TOKEN_KEY = 'jwt_token';
const USER_KEY = 'user_data';
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
        const storedUser = await SecureStore.getItemAsync(USER_KEY);
        if (storedToken && storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync(USER_KEY);
      } finally {
        setIsLoading(false);
      }
    };
    loadStoredData();
  }, []);

  const signIn = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      const { token, usuario } = response.data;
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(usuario));
      setUser(usuario);
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.erro || 'Credenciais inválidas');
      } else {
        throw new Error('Erro de conexão com o servidor');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);