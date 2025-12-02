import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import authStore from './authStore';
import { Notification } from '@/types/notification';

type NotificationStore = {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  total: number;

  fetchUserNotifications: () => Promise<void>;
  markNotificationAsRead: (notificationId: string) => Promise<void>;
  markAllNotificationsAsRead: () => Promise<void>; 
  setNotifications: (data: Notification[]) => void;
};

export const useNotificationStore = create<NotificationStore>()(
  devtools((set, get) => ({
    notifications: [],
    loading: false,
    error: null,
    total: 0,

    setNotifications: (data) => set({ notifications: data }),

    fetchUserNotifications: async () => {
      set({ loading: true, error: null });
      try {
        const token = authStore.getState().userData?.tokens.access.token;
        if(!token) throw new Error("User is not authenticated");
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await axios.get(`${apiUrl}/notifications`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

        const { notifications } = res.data.data;
        set({
          notifications: notifications || [],
          loading: false,
        });
      } catch (err: any) {
        const message = err?.response?.data?.message || err.message || 'Failed to fetch notifications';
        set({ error: message, loading: false });
        toast.error(`${message}`);
      }
    },

    markNotificationAsRead: async (notificationId: string) => {
      set({ loading: true, error: null });
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const { userData } = authStore.getState();
        const token = userData?.tokens.access.token;

        if (!token) throw new Error('Authentication token missing');

        await axios.post(`${apiUrl}/notifications/read`, {
                notificationId,
              }, 
              {
          headers: { Authorization: `Bearer ${token}` },
        });

        // make the read status true in local store
        const updatedNotifications = get().notifications.map((notif) =>
          notif._id === notificationId ? { ...notif, read: true } : notif
        );
        set({ notifications: updatedNotifications, loading: false });
      } catch (err: any) {
        const message = err?.response?.data?.message || err.message || 'Failed to mark as read';
        set({ error: message, loading: false });
        // toast.error(`${message}`);
      }
    },

    // --- NEW ACTION: MARK ALL NOTIFICATIONS AS READ ---
    markAllNotificationsAsRead: async () => {
      set({ loading: true, error: null });
    
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const { userData } = authStore.getState();
        const token = userData?.tokens.access.token;
    
        if (!token) throw new Error('Authentication token missing');
    
        // Mark all notifications as read in backend
        await axios.post(
          `${apiUrl}/notifications/all-read`, {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
    
        // Update local store
        const updatedNotifications = get().notifications.map((notif) => ({
          ...notif,
          read: true,
        }));
        set({ notifications: updatedNotifications, loading: false });
      } catch (err: any) {
        const message =
          err?.response?.data?.message || err.message || 'Failed to mark all notifications as read';
    
        set({ error: message, loading: false });
        // toast.error(`${message}`);
      }
    },
    
  }))
);
