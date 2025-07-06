// src/hooks/useAuth.ts
import { useAuthStore } from '@/store/authStore';

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const register = useAuthStore((state) => state.register);
  const setUser = useAuthStore((state) => state.setUser);
  const setError = useAuthStore((state) => state.setError);
  const login = useAuthStore((state) => state.login);

  return {
    user,
    loading,
    error,
    register,
    login,
    setUser,
    setError,
  };
}
