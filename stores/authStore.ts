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
        // Implement login logic here, e.g., API call
        set({ token: data.token });
      },
      setUser: () => {},
      logout: () => set({ token: null }),
    }),
    {
      name: 'auth-storage', // name of the item in the storage
    },
  ),
);
