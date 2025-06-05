import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const authService = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const response = await api.post('/login', { email, password });
    const { accessToken, refreshToken } = response.data;

    await AsyncStorage.setItem('Cofrinho.accessToken', accessToken);
    await SecureStore.setItemAsync('Cofrinho.refreshToken', refreshToken);

    return response.data;
  },

  me: async () => {
    const response = await api.get('/me');
    return response.data;
  },

  logout: async () => {
    await AsyncStorage.removeItem('Cofrinho.accessToken');
    await SecureStore.deleteItemAsync('Cofrinho.refreshToken');
  },

  refreshToken: async (refreshToken: string) => {
    const response = await api.post('/refresh', { refreshToken });
    const data = response.data as { accessToken: string };

    await AsyncStorage.setItem('Cofrinho.accessToken', data.accessToken);

    return response.data;
  },
};

export default authService;
