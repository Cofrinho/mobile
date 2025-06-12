import api from './api';

const accountService = {
  mountAccountScreen: async () => {
    const { data } = await api.get('/accounts/home');
    return data;
  },
};

export default accountService;
