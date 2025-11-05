'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Charts } from '@/types/dashboard';

type ChartComponentProps = {
  charts?: Charts;
};

const COLORS = ['#00BFA6', '#FFBB28', '#FF4D4F']; // pharmacy-friendly green, yellow, red

const ChartComponent = ({ charts }: ChartComponentProps) => {
  if (!charts) {
    return <div className="text-center text-gray-500 p-4">No chart data available</div>;
  }

  const topUsedMedicines = charts.topUsedMedicines || [];

  const stockStatus = Array.isArray(charts.stockStatus)
    ? charts.stockStatus
    : Object.entries(charts.stockStatus || {}).map(([name, value]) => ({
        name,
        value,
      }));

  return (
    <section className="bg-[#f5faff] py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Analytics & Insights
        </h2>
        <p className="text-gray-600 mb-8 text-sm md:text-base">
          Visual representation of your inventory and stock data
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Top Used Medicines */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
              Top Used Medicines
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={topUsedMedicines}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#2D4DB6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Stock Status */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
              Stock Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stockStatus}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={100}
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {stockStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  layout="horizontal"
                  wrapperStyle={{ marginTop: 16 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartComponent;
