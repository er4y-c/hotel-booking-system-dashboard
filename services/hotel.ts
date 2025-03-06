import { api } from './api';
import { Hotel } from '@/types/hotel';

export const hotelServices = {
  list: async () => {
    return await api.get('/hotel/list');
  },
  details: async (id: string) => {
    return await api.get(`/hotel/details/${id}`);
  },
  create: async (data: Hotel) => {
    return await api.post('/hotel/create', data);
  },
  update: async (id: string, data: Hotel) => {
    return await api.put(`/hotel/update/${id}`, data);
  },
  delete: async (id: string) => {
    return await api.delete(`/hotel/delete/${id}`);
  },
};
