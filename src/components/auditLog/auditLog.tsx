'use client';

import { useEffect, useState } from 'react';
import { AuditLogEntry } from '@/types/auditLog';
import { AuditLogTable } from './AuditLogTable';
import { FilterBar } from './FilterBar';
import { Pagination } from './Pagination';
import useAuditLogs from '@/hooks/useAuditLogs';

const ITEMS_PER_PAGE = 5;

export default function AuditLogHome() {
  const { logs, loading, error } = useAuditLogs();

  const [filteredData, setFilteredData] = useState<AuditLogEntry[]>([]);
  const [actionFilter, setActionFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 🔍 Apply filters on logs
  useEffect(() => {
    if (!logs || logs.length === 0) return;

    let filtered = [...logs];

    if (actionFilter !== 'All') {
      filtered = filtered.filter((item) => item.action === actionFilter);
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [logs, actionFilter]);

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filteredData.slice(start, start + ITEMS_PER_PAGE);

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Audit Log</h1>
      <p className="mb-6 text-gray-600">Track all system activities and changes</p>

      {loading ? (
        <p className="text-blue-600 font-medium">Loading audit logs...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <>
          <FilterBar
            onActionChange={setActionFilter}
          />

          <AuditLogTable entries={paginated} />

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredData.length / ITEMS_PER_PAGE)}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </main>
  );
}
