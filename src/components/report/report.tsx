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

  const downloadPdf = () => {
    if (!data) return;
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setFontSize(16);
    doc.text('Pharmacy Sales & Inventory Report', 14, 20);

    // Metadata
    doc.setFontSize(10);
    doc.text(`Date Range: ${range}`, 14, 28);
    const now = new Date();
    doc.text(`Generated on: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`, 14, 34);

    // KPI Summary
    autoTable(doc, {
      startY: 40,
      head: [['Metric', 'Value']],
      body: [
        ['Total Units Sold', data.kpis.totalUnitsSold ?? 0],
        ['Total Revenue', formatCurrency(data.kpis.totalRevenue ?? 0)],
        ['Total Profit', formatCurrency(data.kpis.totalProfit ?? 0)],
        ['Low Stock Medicines', data.kpis.lowStockCount ?? 0],
        ['Out of Stock Medicines', data.kpis.outOfStockCount ?? 0],
      ],
      styles: { fontSize: 9 },
      headStyles: { fillColor: [33, 150, 243], textColor: 255 },
    });

    // Sold Medicines Table (only in PDF)
    if (data.soldMedicines?.length) {
      autoTable(doc, {
        startY: 100,
        head: [['#', 'Brand', 'Generic', 'Batch', 'Strength', 'Qty Sold', 'Selling Price', 'Purchase Cost', 'Profit', 'Revenue', 'Date Sold']],
        body: data.soldMedicines.map((item, idx) => [
          idx + 1,
          item.brandName,
          item.genericName ?? '-',
          item.batchNumber ?? '-',
          item.strength ?? '-',
          item.quantitySold ?? 0,
          formatCurrency(item.sellingPrice ?? 0),
          formatCurrency(item.purchaseCost ?? 0),
          formatCurrency(item.profit ?? 0),
          formatCurrency((item.quantitySold ?? 0) * (item.sellingPrice ?? 0)),
          new Date(item.soldAt).toLocaleString(),
        ]),
        styles: { fontSize: 8 },
        headStyles: { fillColor: [33, 150, 243], textColor: 255 },
        theme: 'grid',
      });
    }

    doc.save('pharmacy_report.pdf');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inventory & Sales Reports</h1>
          <p className="text-sm text-gray-500">Detailed insights for sales, stock, and profits</p>
        </div>
        <button
          onClick={downloadPdf}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-sm text-sm"
        >
          <Download className="w-4 h-4" />
          Export PDF
        </button>
      </div>

      {loading && <p className="text-sm text-gray-500">Loading report data...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* KPI Cards */}
      {data?.kpis && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          <KpiCard title="Total Units Sold" value={data.kpis.totalUnitsSold ?? 0} icon="💰" />
          <KpiCard title="Total Revenue" value={formatCurrency(data.kpis.totalRevenue ?? 0)} icon="📈" />
          <KpiCard title="Total Profit" value={formatCurrency(data.kpis.totalProfit ?? 0)} icon="🤑" />
          <KpiCard title="Low Stock" value={data.kpis.lowStockCount ?? 0} icon="⚠️" />
          <KpiCard title="Out of Stock" value={data.kpis.outOfStockCount ?? 0} icon="❌" />
        </div>
      )}

      {/* Date Range Selector */}
      <div className="flex items-center gap-2">
        <CalendarDays className="w-5 h-5 text-gray-500" />
        <select
          value={range}
          onChange={(e) => setRange(e.target.value as DateRange)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Today</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 3 Months</option>
          <option>Last Year</option>
        </select>
      </div>

      {/* Sales Trend Chart */}
      {data?.trend && (
        <div className="bg-white rounded-md shadow-sm p-4">
          <h2 className="text-lg font-medium mb-2">Sales Trends</h2>
          <SalesChart
            data={data.trend.map(d => ({
              _id: d._id,
              unitsSold: d.unitsSold,
              revenue: d.revenue ?? 0,
              profit: d.profit ?? 0
            }))}
          />
        </div>
      )}
    </div>
  );
}

function KpiCard({ title, value, icon }: { title: string; value: string | number; icon: string }) {
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardContent className="flex items-center space-x-4 py-4">
        <div className="text-2xl">{icon}</div>
        <div>
          <div className="text-md font-semibold text-gray-700">{value}</div>
          <div className="text-sm text-gray-500">{title}</div>
        </div>
      </CardContent>
    </Card>
  );
}
