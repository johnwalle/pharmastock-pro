// pages/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import { useDashboardData } from '@/hooks/useDashboardData';
import DashboardOverview from './DashboardOverview';
import ChartComponent from './ChartComponent';
import Header from './Header';

const Home: NextPage = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">Error loading dashboard: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5faff]">
      <Head>
        <title>Yenewub Pharmacy Dashboard</title>
        <meta name="description" content="Internal dashboard for Yenewub Pharmacy management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="px-4 md:px-8 lg:px-16 py-6 space-y-12">
        {/* Dashboard Overview */}
        <DashboardOverview overview={data.pharmacyOverview} />

        {/* Charts & Analytics */}
        <ChartComponent charts={data.charts} />

        {/* Quick Actions or additional internal features */}
        {/* <QuickActions /> */}
      </main>
    </div>
  );
};

export default Home;
