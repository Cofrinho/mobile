import api from './api';

interface User {
  name: string;
  cpf: string;
  birth_date: string;
  email: string;
  phone: string;
  password: string;
}

const userService = {
  register: async (user: User) => {
    console.log('Registering user:', user);
    const response = await api.post('/register', user);
    return response.data;
  },
};

export default userService;
