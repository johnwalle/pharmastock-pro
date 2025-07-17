'use client';

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

type TrendEntry = {
    _id: string;
    totalQuantity: number;
};

interface SalesChartProps {
    data: TrendEntry[];
}

export default function SalesChart({ data }: SalesChartProps) {
    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                    <XAxis
                        dataKey="_id"
                        tick={{ fontSize: 12 }}
                        stroke="#94a3b8"
                    />
                    <YAxis
                        tick={{ fontSize: 12 }}
                        stroke="#94a3b8"
                        allowDecimals={false}
                    />
                    <Tooltip
                        formatter={(value: number) => [`${value} units`, 'Sales']}
                        labelFormatter={(label: string) => `Date: ${label}`}
                        contentStyle={{ fontSize: '14px' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="totalQuantity"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
