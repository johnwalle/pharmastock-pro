export interface KPIData {
    totalSales: number;
    soldValue: number;
    lowStockCount: number;
    outOfStockCount: number;
}

export interface TrendEntry {
    _id: string; // formatted date (e.g., "2025-07-16")
    totalQuantity: number;
}

export interface TopSeller {
    brandName: string;
    quantitySold: number;
}

export interface ReportsResponse {
    kpis: KPIData;
    trend: TrendEntry[];
    topSellers: TopSeller[];
}
