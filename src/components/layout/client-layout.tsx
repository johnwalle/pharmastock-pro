'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar';
import useAuthManager from '@/hooks/useAuthManager'; // Adjust path if needed
import authStore from '@/store/authStore';
import useFcmToken from '@/hooks/useFcmToken';
import { useEffect } from 'react';
import axios from 'axios';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useAuthManager(); // <-- Manage auth tokens & idle logout globally here
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { userData } = authStore.getState();

  const { fcmToken } = useFcmToken();

  useEffect(() => {
      if (!fcmToken || !userData) return;
    
      const saveToken = async () => {
        try {
          const token = userData?.tokens?.access?.token;
          if(!token) throw new Error("User is not authenticated");
          console.log('saving fcm token to db....')
          const response = await axios.put(`${apiUrl}/users/save-fcmToken`, { fcmToken, userId: userData.user._id }, {
                      headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                      }
                  });
          console.log("FCM token saved successfully!", response);
        } catch (err) {
          console.error("Failed to save token:", err);
        }
      };
    
      saveToken();
    }, [fcmToken, userData, apiUrl]);

  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <div className={isDashboard ? 'flex' : ''}>
      {!isDashboard && <Navbar />}
      <main className="flex-1">{children}</main>
    </div>
  );
}
