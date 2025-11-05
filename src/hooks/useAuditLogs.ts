// hooks/useAuditLogs.ts

import { useEffect, useState } from 'react';
import axios from 'axios';
import authStore from '@/store/authStore';
import { AuditLogEntry } from '@/types/auditLog';

const useAuditLogs = () => {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const { userData } = authStore.getState();
        const token = userData?.tokens?.access?.token;

        if (!token) {
          throw new Error('Authentication token not found');
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
          throw new Error('API URL is not defined.');
        }

        const response = await axios.get(`${apiUrl}/audit-logs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const logsFromApi = response.data?.data || [];
        setLogs(logsFromApi);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuditLogs();
  }, []);

  return { logs, loading, error };
};

export default useAuditLogs;
