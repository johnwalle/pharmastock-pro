// hooks/useDashboardData.ts
import { useEffect, useState } from 'react';
import axios from 'axios';
import authStore from '@/store/authStore';
import { ReportsResponse } from '@/types/reports';

export const useGetReports = (range: string = 'Last 30 Days') => {
  const [data, setData] = useState<ReportsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { userData } = authStore.getState();
  const token = userData?.tokens?.access?.token;

  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError('Authentication token missing');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${apiURL}/reports?range=${encodeURIComponent(range)}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(res.data.data); // No longer res.data.data — your `/reports` already returns a clean object
      } catch{
        setError('Failed to fetch report data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [range]);

  return { data, loading, error };
};
