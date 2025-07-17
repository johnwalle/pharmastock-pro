export interface PharmacyOverview {
  totalMedicines: number;
  lowStockAlerts: number;
  expiredMedicines: number;
  outOfStockMedicines: number;
}

export interface Charts {
  topUsedMedicines: {
    _id: string;
    name: string;
    count: number;
  }[];
  stockStatus: { [key: string]: number };
}

export interface DashboardData {
  pharmacyOverview: PharmacyOverview;
  charts: Charts;
}
