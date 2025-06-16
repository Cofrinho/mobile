import api from './api';

const notificationService = {
  getNotifications: async (userId: number) => {
    const { data } = await api.get(`/notifications/user/${userId}`);
    return data;
  },

  markAsSeen: async (notificationId: number) => {
    const { data } = await api.patch(`/notifications/${notificationId}/mark-seen`);
  },
};

export default notificationService;
