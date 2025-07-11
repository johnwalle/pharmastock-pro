'use client';

import { create } from 'zustand';

interface Tokens {
  access: {
    token: string;
    expires: string;
  };
}

interface UserData {
  _id: string;
  email: string;
  fullName: string;
  role: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  tokens: Tokens;
}

interface AuthState {
  userData: UserData | null;
  setUserData: (userData: UserData) => void;
  clearUserData: () => void;
  updateAccessToken: (accessToken: Tokens['access']) => void;
}

// Utility: Set cookie
function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
}

// Utility: Get cookie
function getCookie(name: string): string {
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

const authStore = create<AuthState>((set, get) => ({
  userData: (() => {
    try {
      const raw = getCookie('userData');
      return raw ? (JSON.parse(raw) as UserData) : null;
    } catch (e) {
      console.error('Error parsing userData cookie:', e);
      return null;
    }
  })(),

  setUserData: (userData) => {
    // Only store access token on client side
    const minimalUserData = {
      ...userData,
      tokens: {
        access: userData.tokens.access
      },
    };

    set({ userData: minimalUserData });
    setCookie('userData', JSON.stringify(minimalUserData), 7);
    setCookie('accessToken', userData.tokens.access.token, 7); // for middleware
    console.log('User data set:', minimalUserData);
  },

  clearUserData: () => {
    set({ userData: null });
    setCookie('userData', '', -1);       // delete cookie
    setCookie('accessToken', '', -1);    // delete accessToken
    console.log('User data cleared');
  },

  updateAccessToken: (newAccessToken) => {
    const current = get().userData;
    if (!current) return;

    const updated = {
      ...current,
      tokens: {
        access: newAccessToken
      },
    };

    set({ userData: updated });
    setCookie('userData', JSON.stringify(updated), 7);
    setCookie('accessToken', newAccessToken.token, 7);
    console.log('Access token updated:', newAccessToken);
  },
}));

export default authStore;
