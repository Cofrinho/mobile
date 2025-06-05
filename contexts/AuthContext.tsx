import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import authService from '@/services/auth';

interface User {
  id: number;
  name: string;
  cpf: string;
  email: string;
  avatar_url: string;
  email_verified_at: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  const clearStorageAndLogout = async () => {
    await AsyncStorage.multiRemove(['Cofrinho.accessToken', 'Cofrinho.user']);
    await SecureStore.deleteItemAsync('Cofrinho.refreshToken');
    setUser(null);
  };

  const refreshAccessToken = async (): Promise<boolean> => {
    try {
      const refreshToken = await SecureStore.getItemAsync('Cofrinho.refreshToken');
      if (!refreshToken) {
        await clearStorageAndLogout();
        return false;
      }

      const refreshResponse = await authService.refreshToken(refreshToken);

      await AsyncStorage.setItem('Cofrinho.accessToken', refreshResponse.accessToken);

      if (refreshResponse.refreshToken) {
        await SecureStore.setItemAsync('Cofrinho.refreshToken', refreshResponse.refreshToken);
      }

      return true;
    } catch {
      await clearStorageAndLogout();
      return false;
    }
  };

  const loadUserFromStorage = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('Cofrinho.accessToken');
      if (!accessToken) {
        setUser(null);
        return;
      }

      const me = await authService.me();
      setUser(me);
      await AsyncStorage.setItem('Cofrinho.user', JSON.stringify(me));
    } catch {
      await clearStorageAndLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);

      const loginResponse = await authService.login({ email, password });

      const me = await authService.me();
      setUser(me);
      await AsyncStorage.setItem('Cofrinho.user', JSON.stringify(me));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await clearStorageAndLogout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
