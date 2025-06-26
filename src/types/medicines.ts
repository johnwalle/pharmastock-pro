export interface Medicine {
  id: string;
  brandName: string;
  genericName: string;
  batchNumber: string;
  expiryDate: string;
  manufacturingDate: string;
  quantity: number;
  reorderThreshold: number;
  pricePerUnit: number;
  supplierInfo?: string;
  storageLocation?: string;
  photoUrl?: string;
  notes?: string;
}
