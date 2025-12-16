'use client';

import { create } from 'zustand';

// --------------------
// Types
// --------------------
interface AccessToken {
  token: string;
  expires: string;
}

interface RefreshToken {
  token: string;
  expires: string;
}

interface Tokens {
  access: AccessToken;
  refresh?: RefreshToken;
  rememberMe: boolean;
}

interface User {
  _id: string;
  email: string;
  fullName: string;
  role: string;
  fcmToken?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserData {
  user: User;
  tokens: Tokens;
}

interface AuthState {
  userData: UserData | null;
  setUserData: (userData: UserData) => void;
  clearUserData: () => void;
  updateAccessToken: (accessToken: AccessToken) => void;
}

// --------------------
// Cookie Utils
// --------------------
function isClient() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function setCookie(name: string, value: string, days?: number) {
  if (!isClient()) return;
  let cookieStr = `${name}=${encodeURIComponent(value)};path=/;`;
  if (days !== undefined) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    cookieStr += `expires=${date.toUTCString()};`;
  }
  document.cookie = cookieStr;
}

function getCookie(name: string): string {
  if (!isClient()) return '';
  const nameEQ = `${name}=`;
  const cookies = decodeURIComponent(document.cookie).split(';');
  for (let c of cookies) {
    const cookie = c.trim();
    if (cookie.startsWith(nameEQ)) {
      return cookie.substring(nameEQ.length);
    }
  }
  return '';
}

// --------------------
// Store
// --------------------
const authStore = create<AuthState>((set, get) => ({
  userData: (() => {
    if (!isClient()) return null;
    try {
      const raw = getCookie('userData');
      return raw ? (JSON.parse(raw) as UserData) : null;
    } catch (e) {
      console.error('Error parsing userData cookie:', e);
      return null;
    }
  })(),

  setUserData: (userData) => {
    const rememberMe = userData.tokens.rememberMe;

    set({ userData });

    const accessExpires = new Date(userData.tokens.access.expires);
    const msUntilExpiry = accessExpires.getTime() - Date.now();
    const cookieDays = Math.max(1, Math.round(msUntilExpiry / (1000 * 60 * 60 * 24)));

    setCookie('userData', JSON.stringify(userData), rememberMe ? cookieDays : undefined);
    setCookie('accessToken', userData.tokens.access.token, rememberMe ? cookieDays : undefined);
    setCookie('rememberMe', rememberMe ? '1' : '0', rememberMe ? cookieDays : undefined);

  },

  clearUserData: () => {
    set({ userData: null });
    setCookie('userData', '', -1);
    setCookie('accessToken', '', -1);
    setCookie('rememberMe', '', -1);
  },

  updateAccessToken: (accessToken) => {
    const current = get().userData;
    if (!current) return;

    const updated: UserData = {
      ...current,
      tokens: {
        ...current.tokens,
        access: accessToken,
      },
    };

    set({ userData: updated });

    const rememberMe = current.tokens.rememberMe;
    const accessExpires = new Date(accessToken.expires);
    const msUntilExpiry = accessExpires.getTime() - Date.now();
    const cookieDays = Math.max(1, Math.round(msUntilExpiry / (1000 * 60 * 60 * 24)));

    setCookie('userData', JSON.stringify(updated), rememberMe ? cookieDays : undefined);
    setCookie('accessToken', accessToken.token, rememberMe ? cookieDays : undefined);

  },
}));

export default authStore;
