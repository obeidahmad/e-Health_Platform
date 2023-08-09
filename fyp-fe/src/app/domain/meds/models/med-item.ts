export interface MedItem {
  id: string;
  brandName: string;
  description: string;
  dosage: string;
  requiresPrescription: boolean;
  imageUrl?: string;
  quantity: number;
  price: number;
  medClass: string;
  medForm: string;
  isBookmarked?: string;
}
