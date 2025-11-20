import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Medicine } from '@/types/medicines';
import authStore from './authStore';

type MedicineStore = {
  medicines: Medicine[];
  loading: boolean;
  error: string | null;
  total: number;

  fetchMedicines: (query?: Record<string, any>) => Promise<void>;
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
        const res = await axios.get(`${apiUrl}/medicines`, { params: query });

        const { medicines, total } = res.data.data;
        set({
          medicines: medicines || [],
          total: total || 0,
          loading: false,
        });
      } catch (err: any) {
        const message = err?.response?.data?.message || err.message || 'Failed to fetch medicines';
        set({ error: message, loading: false });
        toast.error(`${message}`);
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
        set({
          medicines: updated,
          total: get().total - 1,
          loading: false,
        });

        toast.success('Medicine deleted successfully');
      } catch (err: any) {
        const message = err?.response?.data?.message || err.message || 'Failed to delete medicine';
        set({ error: message, loading: false });
        toast.error(`${message}`);
      }
    },

    // --- NEW ACTION: MOVE STOCK TO DISPENSER ---
    moveStockToDispenser: async (medicineId: string, quantity: number) => {
      set({ loading: true, error: null });
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const { userData } = authStore.getState();
        const token = userData?.tokens.access.token;

        if (!token) throw new Error('Authentication token missing');

        const res = await axios.post(
          `${apiUrl}/medicines/move-to-dispenser/${medicineId}`,
          { quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const updatedMedicine: Medicine = res.data.data;

        // Update local store
        const updatedMedicines = get().medicines.map((med) =>
          med._id === medicineId ? updatedMedicine : med
        );

        set({ medicines: updatedMedicines, loading: false });
        toast.success(`Moved ${quantity} units to dispenser successfully`);
      } catch (err: any) {
        const message = err?.response?.data?.message || err.message || 'Failed to move stock';
        set({ error: message, loading: false });
        toast.error(`${message}`);
      }
    },
  }))
);
