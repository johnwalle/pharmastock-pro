import { useEffect, useRef } from 'react';
import authStore from '@/store/authStore';

const IDLE_TIMEOUT_MS = 20 * 60 * 1000; // 20 minutes
const CHECK_INTERVAL_MS = 60 * 1000; // 1 minute
const REFRESH_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes before expiry
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function isTokenExpiringSoon(expires: string): boolean {
  const timeLeft = new Date(expires).getTime() - Date.now();
  return timeLeft <= REFRESH_THRESHOLD_MS;
}

function isTokenExpired(expires: string): boolean {
  return new Date() > new Date(expires);
}

async function apiRefreshToken(refreshToken: string) {
  try {
    const res = await fetch(`${apiUrl}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) throw new Error('Non-200 response');

    const data = await res.json();
    return data.tokens;
  } catch (_){
    return null;
  }
}

export default function useAuthManager() {
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const resetIdleTimer = () => {
    lastActivityRef.current = Date.now();

    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    const { userData } = authStore.getState();
    if (!userData || userData.tokens.rememberMe) return;

    idleTimerRef.current = setTimeout(() => {
      authStore.getState().clearUserData();
      window.location.href = '/auth/signup';
    }, IDLE_TIMEOUT_MS);
  };

  useEffect(() => {
    const { userData } = authStore.getState();
    const rememberMe = userData?.tokens.rememberMe;

    if (!userData) return;
    if (rememberMe) return;

    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    events.forEach(evt => window.addEventListener(evt, resetIdleTimer));
    resetIdleTimer();

    return () => {
      events.forEach(evt => window.removeEventListener(evt, resetIdleTimer));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const { userData } = authStore.getState();
      if (!userData) return;

      const { access, refresh, rememberMe } = userData.tokens;
      const accessExpiresAt = access.expires;

      const idleTime = Date.now() - lastActivityRef.current;
      const isIdle = idleTime >= IDLE_TIMEOUT_MS;
      const isActive = !isIdle;

      if (!rememberMe && isIdle) {
        authStore.getState().clearUserData();
        window.location.href = '/auth/signup';
        return;
      }

      if (!isTokenExpired(accessExpiresAt) && isTokenExpiringSoon(accessExpiresAt)) {
        if ((rememberMe || isActive) && refresh?.token) {
          const newTokens = await apiRefreshToken(refresh.token);
          if (newTokens?.access) {
            authStore.getState().updateAccessToken(newTokens.access);
            if (!rememberMe) resetIdleTimer();
          } else {
            authStore.getState().clearUserData();
            window.location.href = '/auth/signup';
          }
          return;
        }
      }

      if (isTokenExpired(accessExpiresAt)) {
        if (refresh?.token) {
          const newTokens = await apiRefreshToken(refresh.token);
          if (newTokens?.access) {
            authStore.getState().updateAccessToken(newTokens.access);
            if (!rememberMe) resetIdleTimer();
          } else {
            authStore.getState().clearUserData();
            window.location.href = '/auth/signup';
          }
        } else {
          authStore.getState().clearUserData();
          window.location.href = '/auth/signup';
        }
      }
    }, CHECK_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, []);
}
