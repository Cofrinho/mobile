import api from './api';

export interface Institutions {
  id: number;
  name: string;
  api_url: string;
  logo_url: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

const institutionService = {
  findAll: async (): Promise<Institutions[]> => {
    const { data } = await api.get('/institutions');
    return data;
  },
};

export default institutionService;
