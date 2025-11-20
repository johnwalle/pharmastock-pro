export interface Medicine {
  _id: string;

  // Basic info
  brandName: string;
  genericName: string;
  dosageForm: string;
  strength: string;

  // Unit & quantity
  unitType: 'strip' | 'pack' | 'vial' | 'bottle' | 'ampoule' | 'tube' | 'tin' | 'sachet' | 'each' | 'other';
  customUnitType?: string;   // only used when unitType = "other"

  unitQuantity: number;
  subUnitQuantity?: number;  // optional

  // Stock
  stockStore: number;        // NEW (from schema)
  stockDispenser: number;    // you already had this
  currentStockLevel?: number;

  // Pricing
  purchaseCost: number;      // NEW
  sellingPrice: number;

  // Reorder
  reorderThreshold: number;
  reorderQuantity: number;

  // Dates
  receivedDate: string;
  expiryDate: string;

  // Batch
  batchNumber: string;

  // Additional info
  storageConditions?: string;
  supplierInfo?: string;
  storageLocation?: string;
  notes?: string;

  // Prescription
  prescriptionStatus: 'Prescription' | 'OTC' | 'Controlled';

  // Status
  status: 'available' | 'low-stock' | 'out-of-stock' | 'expired';

  // Image
  imageURL?: string;
}
