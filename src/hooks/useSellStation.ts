// hooks/useSellStation.ts
'use client';

import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import authStore from '../store/authStore';
import { Medicine } from '@/types/medicines';

interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export const useSellStation = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

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
      const token = authStore.getState().userData?.tokens.access.token;
      const payload = cart.map((item) => ({
        medicineId: item.medicine._id,
        quantity: item.quantity,
      }));

      const { data } = await axios.post(
        `${apiUrl}/sell`,
        { cart: payload },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local medicines stock
      const updatedMedicines = [...medicines];
      data.data.forEach((sold: any) => {
        const index = updatedMedicines.findIndex((m) => m._id === sold.medicineId);
        if (index >= 0) updatedMedicines[index].stockDispenser = sold.newDispenserStock;
      });
      setMedicines(updatedMedicines);
      setCart([]);
      toast.success('Sale processed successfully!');
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const message = axiosError.response?.data?.message || axiosError.message || 'Sale failed';
      toast.error(message);
      console.error(message);
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
    totalPrice,
    setSearch,
    addToCart,
    removeFromCart,
    updateQuantity,
    sell,
    fetchMedicines,
  };
};
