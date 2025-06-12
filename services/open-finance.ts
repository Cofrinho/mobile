import api from './api';
export interface GetAllConsentData {
  id: number;
  user_id: number;
  institution_id: number;
  agency: string;
  account_number: string;
  is_active: boolean;
  expired_at: string | null;
  createdAt: string;
  updatedAt: string;
}

const getExpirationDate = (expirationTime: string): string => {
  const now = new Date();

  switch (expirationTime) {
    case '3':
      now.setMonth(now.getMonth() + 3);
      break;

    case '6':
      now.setMonth(now.getMonth() + 6);
      break;

    case '12':
      now.setMonth(now.getMonth() + 12);
      break;

    case '0':
    default:
      break;
  }

  const year = String(now.getFullYear()).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const getExpirationDateByMonth = (month: string): Date => {
  const now = new Date();

  switch (month) {
    case '3':
      now.setMonth(now.getMonth() + 3);
      break;

    case '6':
      now.setMonth(now.getMonth() + 6);
      break;

    case '12':
      now.setMonth(now.getMonth() + 12);
      break;

    case '0':
    default:
      break;
  }

  return now;
};

const openFinanceService = {
  getBalanceAndLogos: async () => {
    const { data } = await api.get('/open-finance/users/balance');
    return data;
  },
  getDetailedBalance: async () => {
    const { data } = await api.get('/open-finance/users/home');
    return data;
  },
  createConsent: async ({
    userId,
    institutionId,
    expirationTime,
  }: {
    userId: number;
    institutionId: number;
    expirationTime: string;
  }) => {
    const formattedDate = getExpirationDateByMonth(expirationTime);

    const { data } = await api.post(
      `/open-finance/users/${userId}/institutions/${institutionId}/consents`,
      expirationTime != '0' ? { date: formattedDate } : {},
    );
    return data;
  },
  getAllConsents: async (userId: number | undefined): Promise<GetAllConsentData[]> => {
    const { data } = await api.get(`/open-finance/users/${userId}/consents`);
    return data;
  },
  revokeConsent: async (consentId: number | undefined) => {
    const { data } = await api.delete(`/open-finance/consents/${consentId}`);
  },
  confirmPayment: async ({
    userId,
    institutionId,
    value,
  }: {
    userId: number;
    institutionId: number;
    value: number;
  }) => {
    const { data } = await api.post(
      `/open-finance/users/${userId}/institutions/${institutionId}/recharge`,
      { amount: value },
    );
    return data;
  },
};

export default openFinanceService;
