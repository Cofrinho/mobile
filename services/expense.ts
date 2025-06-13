import api from './api';

export interface Expense {
  id: number;
  groupId: number;
  name: string;
  description: string;
  value: number;
  balance: number;
  status: string;
  paidAt: string;
  expenseType: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface GroupParticipants {
  id: number;
  name: string;
  avatar: string;
  joinedAt: string;
  isGroupOwner: boolean;
}

export interface CreateExpense {
  groupId: number;
  name: string;
  description: string;
  value: number | string;
  dueDate: string;
  participants: {
    userId: number;
    amount: number;
    percentagePaid: number;
  }[];
}

export const ExpenseService = {
  getGroupExpenses: async (groupId: number) => {
    const { data } = await api.get(`/groups/${groupId}/expenses`);
    return data;
  },
  createExpense: async (groupId: number, createExpenseData: CreateExpense) => {
    const { data } = await api.post(`/groups/${groupId}/expenses`, createExpenseData);
    return data;
  },
  getExpenseDetails: async (groupId: number, expenseId: string): Promise<Expense> => {
    const { data } = await api.get(`/groups/${groupId}/expenses/${expenseId}`);
    return data;
  },
  getExpenseMembers: async (groupId: number, expenseId: string) => {
    const { data } = await api.get(`/groups/${groupId}/expenses/${expenseId}/members`);
    return data;
  },
  createMemberExpenseTransaction: async (expenseMemberId: number) => {
    const { data } = await api.post(`/groups/expenseMembers/${expenseMemberId}/transactions`);
    return data;
  },
  createExpensePayment: async (expenseId: string) => {
    const { data } = await api.post(`/groups/expenses/${expenseId}/payments`);
    return data;
  },
};
