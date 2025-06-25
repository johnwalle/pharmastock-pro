"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const topUsedData = [
  { name: "Paracetamol", count: 450 },
  { name: "Amoxicillin", count: 320 },
  { name: "Ibuprofen", count: 280 },
  { name: "Aspirin", count: 240 },
  { name: "Metformin", count: 200 },
];

const stockStatusData = [
  { name: "In Stock", value: 60 },
  { name: "Low Stock", value: 25 },
  { name: "Out of Stock", value: 15 },
];

const expiryTrendsData = [
  { month: "Jan", items: 30 },
  { month: "Feb", items: 25 },
  { month: "Mar", items: 40 },
  { month: "Apr", items: 35 },
  { month: "May", items: 45 },
  { month: "Jun", items: 38 },
];

const COLORS = ["#00C49F", "#FFBB28", "#FF4D4F"];

const AnalyticsInsights = () => {
  return (
    <section className="bg-gray-50 py-12 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Analytics & Insights
        </h2>
        <p className="text-gray-600 mb-8">
          Visual representation of your inventory data
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Used Medicines */}
          <div className="bg-white rounded-xl border p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Top Used Medicines
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={topUsedData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#2D4DB6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Stock Status */}
          <div className="bg-white rounded-xl border p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Stock Status
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={stockStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {stockStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Expiry Trends */}
          <div className="bg-white rounded-xl border p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Expiry Trends
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={expiryTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="items"
                  stroke="#1D4ED8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsInsights;
