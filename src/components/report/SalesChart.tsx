'use client';

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Brush } from 'recharts';

type TrendEntry = {
  _id: string;
  unitsSold: number;
  revenue: number;
  profit: number;
};

interface SalesChartProps {
  data: TrendEntry[];
}

export default function SalesChart({ data }: SalesChartProps) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
          <XAxis
            dataKey="_id"
            tick={{ fontSize: 12 }}
            stroke="#94a3b8"
            interval={Math.ceil(data.length / 10)}
            angle={-45}
            textAnchor="end"
          />
          <YAxis yAxisId="left" tick={{ fontSize: 12 }} stroke="#2563eb" allowDecimals={false} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} stroke="#16a34a" />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === 'unitsSold') return [`${value.toLocaleString()} units`, 'Units Sold'];
              return [`$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, name.charAt(0).toUpperCase() + name.slice(1)];
            }}
            labelFormatter={(label: string) => `Date: ${label}`}
            contentStyle={{ fontSize: '14px' }}
          />
          <Legend verticalAlign="top" height={36} />
          <Line yAxisId="left" type="monotone" dataKey="unitsSold" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} name="Units Sold" />
          <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} name="Revenue" />
          <Line yAxisId="right" type="monotone" dataKey="profit" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} name="Profit" />
          <Brush dataKey="_id" height={30} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}