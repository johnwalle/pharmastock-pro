// hooks/useDashboardData.ts
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DashboardData } from '@/types/dashboard';
import authStore from '@/store/authStore';

export const useDashboardData = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get the token of the logged-in user
    const getAuthHeaders = () => {
        const { userData } = authStore.getState();
        const token = userData?.tokens?.access?.token;

        if (!token) {
            throw new Error('Authentication token not found');
        }

        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    };
    // Fetch dashboard data
    const apiURl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await axios.get(`${apiURl}/sell/analytics`, getAuthHeaders());
                console.log('Dashboard data fetched:', res.data);
                setData(res.data.data);
            } catch (err) {
                setError('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return { data, loading, error };
};
