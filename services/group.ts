import api from './api';

interface Group {
  name: string;
  description: string;
  image?: string;
  members?: string[];
}

const groupService = {
  create: async (group: Group) => {
    const response = await api.post('/groups', group);
    return response.data;
  },
  getAllByUser: async (userId: number) => {
    const response = await api.get(`/groups/user/${userId}`);
    return response.data;
  },
};

export default groupService;
