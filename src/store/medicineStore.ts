import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { Medicine } from '@/types/medicines';
import authStore from './authStore';
import { createNotification, sendNotification } from '@/lib/api';

type MedicineStore = {
  medicines: Medicine[];
  loading: boolean;
  error: string | null;
  total: number;

  fetchMedicines: (query?: Record<string, string | number>) => Promise<void>;
  deleteMedicine: (id: string) => Promise<void>;
  moveStockToDispenser: (medicineId: string, quantity: number) => Promise<void>;
  setMedicines: (data: Medicine[]) => void;
};

export const useMedicineStore = create<MedicineStore>()(
  devtools((set, get) => ({
    medicines: [],
    loading: false,
    error: null,
    total: 0,

    setMedicines: (data) => set({ medicines: data }),

    fetchMedicines: async (query = {}) => {
      set({ loading: true, error: null });
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await axios.get<{ data: { medicines: Medicine[]; total: number } }>(
          `${apiUrl}/medicines`,
          { params: query }
        );

        const { medicines, total } = res.data.data;
        set({ medicines: medicines || [], total: total || 0, loading: false });
      } catch (err: unknown) {
        let message = 'Failed to fetch medicines';
        if (axios.isAxiosError(err)) {
          message = err.response?.data?.message || err.message;
        } else if (err instanceof Error) {
          message = err.message;
        }
        set({ error: message, loading: false });
        toast.error(message);
      }
    },

    deleteMedicine: async (id: string) => {
      set({ loading: true, error: null });
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const { userData } = authStore.getState();
        const token = userData?.tokens.access.token;

        if (!token) throw new Error('Authentication token missing');

        await axios.delete(`${apiUrl}/medicines/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const updated = get().medicines.filter((med) => med._id !== id);
        set({ medicines: updated, total: get().total - 1, loading: false });

        toast.success('Medicine deleted successfully');
      } catch (err: unknown) {
        let message = 'Failed to delete medicine';
        if (axios.isAxiosError(err)) {
          message = err.response?.data?.message || err.message;
        } else if (err instanceof Error) {
          message = err.message;
        }
        set({ error: message, loading: false });
        toast.error(message);
      }
    },

    moveStockToDispenser: async (medicineId: string, quantity: number) => {
      set({ loading: true, error: null });

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const { userData } = authStore.getState();
        const token = userData?.tokens.access.token;

        if (!token) throw new Error('Authentication token missing');

        const res = await axios.post<{ data: Medicine }>(
          `${apiUrl}/medicines/move-to-dispenser/${medicineId}`,
          { quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const updatedMedicine = res.data.data;

        const updatedMedicines = get().medicines.map((med) =>
          med._id === medicineId ? updatedMedicine : med
        );

        const fcmToken = userData.user.fcmToken;
        const medicineName = updatedMedicine.brandName;
        const status = updatedMedicine.status;

        let title = '';
        let message = '';

        if (status === 'low-stock') {
          title = 'Medicine Low Stock';
          message = `The medicine ${medicineName} is running low in stock. Restock soon.`;
        } else if (status === 'expired') {
          title = 'Medicine Expired';
          message = `The medicine ${medicineName} is expired. Please replace it immediately.`;
        } else if (status === 'out-of-stock') {
          title = 'Medicine Out of Stock';
          message = `The medicine ${medicineName} is completely out of stock. Please restock immediately.`;
        }

        if (title && message) {
          if (fcmToken) {
            await sendNotification(fcmToken, { title, message });
          }
          await createNotification(userData.user._id, title, message, '');
        }

        set({ medicines: updatedMedicines, loading: false });
        toast.success(`Moved ${quantity} units to dispenser successfully`);
      } catch (err: unknown) {
        let message = 'Failed to move stock';
        if (axios.isAxiosError(err)) {
          message = err.response?.data?.message || err.message;
        } else if (err instanceof Error) {
          message = err.message;
        }
        set({ error: message, loading: false });
        toast.error(message);
      }
    },
  }))
);
