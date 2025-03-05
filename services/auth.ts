import { api } from './api';

export const authServices = {
  signin: async (email: string, password: string) => {
    return api.post('/auth/signin', { email, password });
  },
  signup: async (
    name: string,
    surname: string,
    phone: string,
    identityNumber: string,
    email: string,
    password: string,
  ) => {
    return api.post('/auth/signup', { name, surname, phone, identityNumber, email, password });
  },
  profile: async () => {
    return api.get('/auth/profile');
  },
};
