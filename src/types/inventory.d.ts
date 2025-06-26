export interface MedicineItem {
  name: string;
  generic?: string;
  type?: string;
  batch: string;
  quantity: string;
  expiry: string;
  status: 'Available' | 'Low Stock' | 'Out of Stock';
}
