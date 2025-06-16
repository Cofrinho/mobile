import api from './api';

const transactionService = {
  getTransactions: async () => {
    const { data } = await api.get('/accounts/users/transactions');
    return data;
  },
  getTransactionsNoLimit: async () => {
    const { data } = await api.get('/accounts/users/transactions?limit=12');
    return data;
  },
};

export default transactionService;
