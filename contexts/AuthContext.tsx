import authService from '@/services/auth';
import userService from '@/services/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { createContext, useEffect, useState } from 'react';

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
  register: (userData: any) => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const clearStorageAndLogout = async () => {
    await AsyncStorage.multiRemove(['Cofrinho.accessToken']);
    await SecureStore.deleteItemAsync('Cofrinho.refreshToken');
    setUser(null);
  };

  const checkAuth = async () => {
    try {
      let accessToken = await AsyncStorage.getItem('Cofrinho.accessToken');
      const refreshToken = await SecureStore.getItemAsync('Cofrinho.refreshToken');

      if (!accessToken || !refreshToken) {
        setIsAuthenticated(false);
        return;
      }

      if (!accessToken && !refreshToken) {
        setIsAuthenticated(false);
        return;
      }

      const me = await authService.me();

      setUser(me);
      setIsAuthenticated(true);
    } catch (error: any) {
      if (error.response?.status === 401) {
        const refreshToken = await SecureStore.getItemAsync('Cofrinho.refreshToken');

        if (refreshToken) {
          await authService.refreshToken(refreshToken);

          const me = await authService.me();
          setUser(me);

          setIsAuthenticated(true);
          return;
        }
      }

      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);

      const loginResponse = await authService.login({ email, password });

      const me = await authService.me();
      setUser(me);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await clearStorageAndLogout();
  };

  const register = async (userData: any) => {
    try {
      setLoading(true);
      const response = await userService.register(userData);
      setUser(response);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
