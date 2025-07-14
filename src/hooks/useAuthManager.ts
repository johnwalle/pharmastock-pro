import { useEffect, useRef } from 'react';
import authStore from '@/store/authStore';

const IDLE_TIMEOUT_MS = 20 * 60 * 1000; // 20 minutes
const CHECK_INTERVAL_MS = 60 * 1000; // 1 minute
const REFRESH_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes before expiry
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function isTokenExpiringSoon(expires: string): boolean {
  const timeLeft = new Date(expires).getTime() - Date.now();
  const expiring = timeLeft <= REFRESH_THRESHOLD_MS;
  console.log(`[TOKEN CHECK] Access token expiring soon: ${expiring} (in ${Math.floor(timeLeft / 1000)}s)`);
  return expiring;
}

function isTokenExpired(expires: string): boolean {
  const expired = new Date() <= new Date(expires) ? false : true;
  console.log(`[TOKEN CHECK] Access token expired: ${expired}`);
  return expired;
}

async function apiRefreshToken(refreshToken: string) {
  console.log('[REFRESH] Attempting to refresh access token...');
  try {
    const res = await fetch(`${apiUrl}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) throw new Error('Non-200 response');

    const data = await res.json();
    console.log('[REFRESH] Token refresh successful');
    return data.tokens;
  } catch (error) {
    console.error('[REFRESH ERROR] Failed to refresh token:', error);
    return null;
  }
}

export default function useAuthManager() {
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const resetIdleTimer = () => {
    lastActivityRef.current = Date.now();
    console.log('[IDLE TIMER] User activity detected. Timer reset.');

    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    const { userData } = authStore.getState();
    if (!userData || userData.tokens.rememberMe) return;

    idleTimerRef.current = setTimeout(() => {
      console.warn('[IDLE TIMER] User inactive for 20 minutes (rememberMe: false). Logging out...');
      authStore.getState().clearUserData();
      window.location.href = '/auth/signup';
    }, IDLE_TIMEOUT_MS);
  };

  useEffect(() => {
    const { userData } = authStore.getState();
    const rememberMe = userData?.tokens.rememberMe;

    if (!userData) {
      console.log('[INIT] No user data found. Skipping idle tracking.');
      return;
    }

    if (rememberMe) {
      console.log('[INIT] RememberMe is TRUE. Skipping idle tracking.');
      return;
    }

    console.log('[INIT] RememberMe is FALSE. Attaching idle listeners...');
    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    events.forEach(evt => window.addEventListener(evt, resetIdleTimer));
    resetIdleTimer();

    return () => {
      console.log('[CLEANUP] Removing idle event listeners...');
      events.forEach(evt => window.removeEventListener(evt, resetIdleTimer));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const { userData } = authStore.getState();
      if (!userData) {
        console.log('[CHECK] No userData in store. Skipping check.');
        return;
      }

      const { access, refresh, rememberMe } = userData.tokens;
      const accessExpiresAt = access.expires;
      console.log(`[CHECK] Access token expires at: ${accessExpiresAt}`);

      const idleTime = Date.now() - lastActivityRef.current;
      const isIdle = idleTime >= IDLE_TIMEOUT_MS;
      const isActive = !isIdle;

      if (!rememberMe && isIdle) {
        console.warn('[IDLE CHECK] Inactivity timeout reached. Logging out (rememberMe: false)...');
        authStore.getState().clearUserData();
        window.location.href = '/auth/signup';
        return;
      }

      // Proactive refresh if token is expiring soon (within 5 min)
      if (!isTokenExpired(accessExpiresAt) && isTokenExpiringSoon(accessExpiresAt)) {
        if ((rememberMe || isActive) && refresh?.token) {
          console.log('[PROACTIVE REFRESH] Token expiring soon. Refreshing...');
          const newTokens = await apiRefreshToken(refresh.token);
          if (newTokens?.access) {
            authStore.getState().updateAccessToken(newTokens.access);
            console.log('[PROACTIVE REFRESH] Access token updated.');
            if (!rememberMe) resetIdleTimer();
          } else {
            console.warn('[REFRESH FAILED] Logging out...');
            authStore.getState().clearUserData();
            window.location.href = '/auth/signup';
          }
          return;
        }
      }

      // Expired token handling
      if (isTokenExpired(accessExpiresAt)) {
        console.warn('[TOKEN EXPIRED] Access token expired.');
        if (refresh?.token) {
          console.log('[EXPIRED TOKEN] Attempting refresh...');
          const newTokens = await apiRefreshToken(refresh.token);
          if (newTokens?.access) {
            authStore.getState().updateAccessToken(newTokens.access);
            console.log('[EXPIRED TOKEN] Token refreshed successfully.');
            if (!rememberMe) resetIdleTimer();
          } else {
            console.warn('[EXPIRED TOKEN] Refresh failed. Logging out.');
            authStore.getState().clearUserData();
            window.location.href = '/auth/signup';
          }
        } else {
          console.warn('[EXPIRED TOKEN] No refresh token found. Logging out.');
          authStore.getState().clearUserData();
          window.location.href = '/auth/signup';
        }
      } else {
        console.log('[CHECK] Access token still valid.');
      }
    }, CHECK_INTERVAL_MS);

    return () => {
      console.log('[CLEANUP] Clearing token check interval.');
      clearInterval(interval);
    };
  }, []);
}
