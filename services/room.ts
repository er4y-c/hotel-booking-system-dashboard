import { api } from './api';
import { Room } from '@/types/room';

export const roomServices = {
  list: async () => {
    return api.get('/room');
  },
  details: async (id: string) => {
    return api.get(`/room/${id}`);
  },
  create: async (room: Room) => {
    return api.post('/room', room);
  },
  update: async (room: Room) => {
    return api.patch(`/room/${room._id}`, room);
  },
  delete: async (id: string) => {
    return api.delete(`/room/${id}`);
  },
};
