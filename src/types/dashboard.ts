export interface PharmacyOverview {
  totalMedicines: number;
  lowStockAlerts: number;
  expiredMedicines: number;
}

export interface Charts {
  topUsedMedicines: number[];
  stockStatus: { [key: string]: number };
  expiryTrends: number[];
}

export interface DashboardData {
  pharmacyOverview: PharmacyOverview;
  charts: Charts;
}