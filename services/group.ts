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
  getAll: async () => {
    const response = await api.get('/groups');
    return response.data;
  },
};

export default groupService;
