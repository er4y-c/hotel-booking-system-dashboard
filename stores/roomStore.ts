import { create } from 'zustand';
import { Room } from '@/types/room';

interface RoomState {
  rooms: Room[];
  setRooms: (rooms: Room[]) => void;
  addRoom: (room: Room) => void;
  updateRoom: (room: Room) => void;
  deleteRoom: (roomId: string) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  rooms: [],
  setRooms: (rooms) => set({ rooms }),
  addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
  updateRoom: (room) =>
    set((state) => ({
      rooms: state.rooms.map((r) => (r._id === room._id ? room : r)),
    })),
  deleteRoom: (roomId) =>
    set((state) => ({
      rooms: state.rooms.filter((r) => r._id !== roomId),
    })),
}));
