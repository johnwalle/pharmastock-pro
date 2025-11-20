export interface KPIData {
  totalUnitsSold: number;
  totalRevenue: number;
  totalProfit: number;
  lowStockCount: number;
  outOfStockCount: number;
}

export interface TrendEntry {
  _id: string; // date string
  unitsSold: number;
  revenue: number;
  profit: number;
}

export interface SoldMedicine {
  brandName: string;
  genericName: string;
  batchNumber: string;
  strength: string;
  sellingPrice: number;
  purchaseCost: number;
  quantitySold: number;
  profit: number;
  revenue: number;
  soldAt: Date;
}

export interface ReportsResponse {
  kpis: KPIData;
  trend: TrendEntry[];
  soldMedicines: SoldMedicine[];
}
