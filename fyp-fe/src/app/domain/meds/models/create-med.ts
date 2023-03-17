export interface CreateMed {
  brandName: string;
  dosage: string;
  medClass: string;
  requiresPrescription: boolean;
  medForm: string;
  description?: string;
  quantity: number;
  price: number;
  isPrivate: boolean;
}

export interface UpdateMed extends CreateMed {
  uid: string;
}
