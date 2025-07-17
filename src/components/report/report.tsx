'use client';

import { useState } from 'react';
import { Download, CalendarDays } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SalesChart from './SalesChart';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatCurrency } from '@/lib/utils';
import { useGetReports } from '@/hooks/useGetReports';

type DateRange = 'Today' | 'Last 7 Days' | 'Last 30 Days' | 'Last 3 Months' | 'Last Year';

export default function ReportPage() {
  const [range, setRange] = useState<DateRange>('Last 30 Days');
  const { data, loading, error } = useGetReports(range);
  console.log('the data fetched ', data)

  const downloadPdf = () => {
    if (!data?.topSellers || data.topSellers.length === 0) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Top Selling Medicines Report', 14, 20);

    // Add metadata
    doc.setFontSize(10);
    doc.text(`Date Range: ${range}`, 14, 28);
    const now = new Date();
    doc.text(`Generated on: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`, 14, 34);

    // Table content
    autoTable(doc, {
      startY: 40,
      head: [['#', 'Medicine', 'Quantity Sold']],
      body: data.topSellers.map((item, index) => [
        index + 1,
        item.brandName,
        item.quantitySold,
      ]),
      styles: {
        halign: 'left',
        fontSize: 10,
      },
      headStyles: {
        fillColor: [33, 150, 243], // blue header
        textColor: 255,
      },
    });

    doc.save('top_selling_report.pdf');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inventory Reports</h1>
          <p className="text-sm text-gray-500">Sales and stock insights</p>
        </div>
        <button
          onClick={downloadPdf}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-sm text-sm"
        >
          <Download className="w-4 h-4" />
          Export PDF
        </button>

      </div>

      {/* Loading/Error States */}
      {loading && <p className="text-sm text-gray-500">Loading report data...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* KPI Cards */}
      {data?.kpis && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <KpiCard
            title="Total Sales (Qty)"
            value={data.kpis.totalSales ?? 0}
            icon="💰"
          />
          <KpiCard
            title="Revenue Generated"
            value={formatCurrency(data.kpis.soldValue ?? 0)}
            icon="📈"
          />
          <KpiCard
            title="Low Stock"
            value={data.kpis.lowStockCount ?? 0}
            icon="⚠️"
          />
          <KpiCard
            title="Out of Stock"
            value={data.kpis.outOfStockCount ?? 0}
            icon="❌"
          />
        </div>
      )}


      {/* Date Range Selector */}
      <div className="flex items-center gap-2">
        <CalendarDays className="w-5 h-5 text-gray-500" />
        <select
          value={range}
          onChange={e => setRange(e.target.value as DateRange)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Today</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 3 Months</option>
          <option>Last Year</option>
        </select>
      </div>

      {/* Sales Chart */}
      {data?.trend && (
        <div className="bg-white rounded-md shadow-sm p-4">
          <h2 className="text-lg font-medium mb-2">Sales Trends</h2>
          <SalesChart data={data.trend} />
        </div>
      )}

      {/* Top Sellers Table */}
      {data?.topSellers && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto p-4">
          <h2 className="text-lg font-medium mb-2">Top Selling Medicines</h2>
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Medicine</th>
                <th className="px-4 py-2">Qty Sold</th>
              </tr>
            </thead>
            <tbody>
              {data.topSellers.map((item, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{item.brandName}</td>
                  <td className="px-4 py-2">{item.quantitySold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function KpiCard({ title, value, icon }: { title: string; value: string | number; icon: string }) {
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardContent className="flex items-center space-x-4 py-6">
        <div className="text-3xl">{icon}</div>
        <div>
          <div className="text-lg font-semibold text-gray-700">{value}</div>
          <div className="text-sm text-gray-500">{title}</div>
        </div>
      </CardContent>
    </Card>
  );
}
