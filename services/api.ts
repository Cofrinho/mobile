import axios from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = Constants.expoConfig?.extra?.apiUrl ?? 'http://localhost:3000';

const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('Cofrinho.accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
