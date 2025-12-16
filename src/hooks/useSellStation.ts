// hooks/useSellStation.ts
'use client';

import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import authStore from '../store/authStore';
import { Medicine } from '@/types/medicines';
import { createNotification, sendNotification } from '@/lib/api';

interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export const useSellStation = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [sellLoading, setSellLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchMedicines = async () => {
    if (!apiUrl) return;
    try {
      setLoading(true);
      const token = authStore.getState().userData?.tokens.access.token;
      const { data } = await axios.get(`${apiUrl}/medicines/get/dispenser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Fetched medicines:', data.data);
      setMedicines(data.data);
    } catch (error) {
      console.error('Failed to fetch medicines', error);
      toast.error('Failed to fetch medicines');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const addToCart = (medicine: Medicine) => {
    const existing = cart.find((c) => c.medicine._id === medicine._id);
    if (existing) {
      if (existing.quantity < medicine.stockDispenser) {
        setCart((prev) =>
          prev.map((c) =>
            c.medicine._id === medicine._id ? { ...c, quantity: c.quantity + 1 } : c
          )
        );
      }
    } else {
      setCart([...cart, { medicine, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((c) => c.medicine._id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    const item = cart.find((c) => c.medicine._id === id);
    if (item && quantity > item.medicine.stockDispenser) return;

    setCart(cart.map((c) => (c.medicine._id === id ? { ...c, quantity } : c)));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.medicine.sellingPrice,
    0
  );

  const sell = async () => {
    if (!apiUrl || cart.length === 0) return toast.error('Cart is empty!');

    try {
      setSellLoading(true);
      const token = authStore.getState().userData?.tokens.access.token;
      const userId = authStore.getState().userData?.user._id as string; // adjust if needed
      const fcmToken = authStore.getState().userData?.user.fcmToken; // change based on your setup

      const payload = cart.map((item) => ({
        medicineId: item.medicine._id,
        quantity: item.quantity,
      }));

      const { data } = await axios.post(
        `${apiUrl}/sell`,
        { cart: payload },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local medicines
      const updatedMedicines = [...medicines];

      // Process each sold medicine
      for (const sold of data.data) {
        const index = updatedMedicines.findIndex((m) => m._id === sold.medicineId);

        if (index >= 0) {
          // Update dispenser stock
          updatedMedicines[index].stockDispenser = sold.newDispenserStock;

          // Also update status if backend returns updated status
          if (sold.status) {
            updatedMedicines[index].status = sold.status;
          }

          const med = updatedMedicines[index];

          /// 📌 HANDLE NOTIFICATIONS BASED ON STATUS  
          let title = '';
          let message = '';

          if (med.status === 'low-stock') {
            title = `Low Stock Alert: ${med.brandName}`;
            message = `${med.brandName} is running low. Remaining stock: ${med.unitQuantity}`;
          }

          if (med.status === 'expired') {
            title = `Expired Medicine: ${med.brandName}`;
            message = `${med.brandName} has expired and should not be dispensed.`;
          }

          if (med.status === 'out-of-stock') {
            title = `Out of Stock: ${med.brandName}`;
            message = `${med.brandName} is now fully out of stock.`;
          }

          // If there's a notification to send
          if (title && message && fcmToken) {
            try {
              await sendNotification(fcmToken, { title: title, message });

              // After sending FCM → Create DB Notification
              await createNotification(
                userId,
                title,
                message,
                `/inventory/medicines/${med._id}`
              );
            } catch (notificationError) {
              console.error("Notification error:", notificationError);
            }
          }
        }
      }

      // Update Zustand store
      setSellLoading(false);
      setMedicines(updatedMedicines);
      setCart([]);
      toast.success('Sale processed successfully!');

    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const message = axiosError.response?.data?.message || axiosError.message || 'Sale failed';
      toast.error(message);
    }
  };

  const filteredMedicines = medicines.filter(
    (med) =>
      med.brandName.toLowerCase().includes(search.toLowerCase()) ||
      med.genericName.toLowerCase().includes(search.toLowerCase()) ||
      med.batchNumber.toLowerCase().includes(search.toLowerCase())
  );

  return {
    medicines: filteredMedicines,
    cart,
    setCart,
    search,
    loading,
    sellLoading,
    totalPrice,
    setSearch,
    addToCart,
    removeFromCart,
    updateQuantity,
    sell,
    fetchMedicines,
  };
};
