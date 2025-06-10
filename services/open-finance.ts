import api from './api';

const openFinanceService = {
  getBalanceAndLogos: async () => {
    const { data } = await api.get('/open-finance/users/balance');
    return data;
  },
  getDetailedBalance: async () => {
    const { data } = await api.get('/open-finance/users/home');
    return data;
  },
};

export default openFinanceService;
