export interface Medicine {
  _id: string;

  // Basic info
  brandName: string;
  genericName: string;
  dosageForm: string;
  strength: string;

  // Unit & quantity
  unitType:
    | 'strip'
    | 'pack'
    | 'vial'
    | 'bottle'
    | 'ampoule'
    | 'tube'
    | 'tin'
    | 'sachet'
    | 'each';

  /**
   * Used ONLY when a custom unit was entered via the form.
   * Backend stores the resolved value here.
   */
  customUnitType?: string;

  unitQuantity: number;
  subUnitQuantity?: number;

  // Stock
  stockStore: number;
  stockDispenser: number;
  currentStockLevel?: number;

  // Pricing
  purchaseCost: number;
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
