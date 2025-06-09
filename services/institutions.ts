import api from './api';

const institutionService = {
  findAll: async () => {
    const { data } = await api.get('/institutions');
    return data;
  },
};

export default institutionService;
