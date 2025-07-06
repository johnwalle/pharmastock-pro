// src/store/authStore.ts
import { create } from 'zustand';
import { apiRequest } from '@/lib/api';
import { setTokenCookie } from '@/lib/auth/jwt';

interface User {
  id: string;
  fullName: string;
  email: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  register: (data: { fullName: string; email: string; password: string }) => Promise<number>;
  login: (data: { email: string; password: string }) => Promise<number>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  register: async ({ fullName, email, password }) => {
    set({ loading: true, error: null });

    try {
      const { status } = await apiRequest<{ message: string }>(
        'http://localhost:5000/api/v1/auth/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName, email, password }),
        }
      );

      console.log('Registration status:', status);

      set({ loading: false });
      return status;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      return 500; // fallback status
    }
  },

login: async ({ email, password }) => {
  set({ loading: true, error: null });

  const { data, status, error } = await apiRequest<{
    message: string;
    user: User;
    tokens: {
      access: {
        token: string;
        expires: string;
      };
      refresh: {
        token: string;
        expires: string;
      };
    };
  }>('http://localhost:5000/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

 if (error || !data) {
  set({ error: error ?? 'Login failed', loading: false });
  return status;
}

  console.log('Login Tokens:', data.tokens);
  console.log('Login Status Code:', status);

  // Store access and refresh tokens in cookies
  await setTokenCookie(data.tokens);
  // Set authenticated user state
  set({ user: data.user, loading: false });

  return status;
}

}));