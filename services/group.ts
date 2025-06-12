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
  getById: async (groupId: string) => {
    const response = await api.get(`/groups/${groupId}`);
    return response.data;
  },
  getAllByUser: async (userId: number) => {
    const response = await api.get(`/groups/user/${userId}`);
    return response.data;
  },
  joinGroup: async (accessCode: string) => {
    const response = await api.post(`/participants/access-code/${accessCode}`);
    return response.data;
  },
  update: async (groupId: string, group: Partial<Group>) => {
    const response = await api.patch(`/groups/${groupId}`, group);
    return response.data;
  },
  delete: async (groupId: string) => {
    const response = await api.delete(`/groups/${groupId}`);
    return response.data;
  },
  getMembers: async (groupId: string) => {
    const response = await api.get(`/participants/group/${groupId}`);
    return response.data;
  },
};

export default groupService;
