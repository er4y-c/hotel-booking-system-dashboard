import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: string | null;
  setToken: (data: { token: string; token_type: string }) => void;
  setUser: (data: { email: string; password: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (data) => {
        set({ token: data.token });
      },
      setUser: () => {},
      logout: () => set({ token: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
