import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Hotel } from '@/types/hotel';

interface HotelState {
  isLoading: boolean;
  hotels: Hotel[];
  selectedHotel: Hotel;
  setHotels: (data: Hotel[]) => void;
  setSelectedHotel: (data: Hotel) => void;
  setIsLoading: (data: boolean) => void;
}

export const useHotelStore = create<HotelState>()(
  persist(
    (set) => ({
      isLoading: false,
      hotels: [],
      selectedHotel: {
        name: '',
        address: '',
        description: '',
        contactMail: '',
        contactPhone: '',
        gallery: [],
      },
      setHotels: (data) => {
        set({ hotels: data });
      },
      setSelectedHotel: (data) => {
        set({ selectedHotel: data });
      },
      setIsLoading: (data) => {
        set({ isLoading: data });
      },
    }),
    {
      name: 'hotel-storage',
    },
  ),
);
