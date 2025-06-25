import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import DashboardOverview from './DashboardOverview';
import QuickActions from './QuickActionButton';
import ChartComponent from './ChartComponent';
import Header from './Header'
import { DashboardData } from '@/types/dashboard';

const Home: NextPage = () => {
  // Sample data (replace with API call in production)
  const dashboardData: DashboardData = {
    pharmacyOverview: {
      totalMedicines: 2847,
      lowStockAlerts: 23,
      expiredMedicines: 156,
    },
    charts: {
      topUsedMedicines: [50, 45, 30, 25, 20],
      stockStatus: { inStock: 70, lowStock: 20, outOfStock: 10 },
      expiryTrends: [10, 15, 20, 25, 30],
    },
  };

  // Error handling state
  const [error, setError] = useState<string | null>(null);

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Head>
        <title>PharmStock Dashboard</title>
        <meta name="description" content="Pharmacy management dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header >
        <Header />
      </header>

      <main>
        <DashboardOverview />
      </main>

      <main>
        <ChartComponent />
      </main>

      <footer className="mt-6">
        <main>
          <QuickActions />
        </main>
        <p className="text-center text-gray-500 mt-4">© 2025 PharmStock System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;