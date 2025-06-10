import api from './api';

const openFinanceService = {
  getBalanceAndLogos: async () => {
    const { data } = await api.get('/open-finance/users/balance');
    return data;
  },
};

export default openFinanceService;
