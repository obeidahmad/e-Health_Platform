export interface MedsQuerySettings {
  pageNumber: number;
  pageSize: number;
  searchText?: string;
  medClass?: string;
  medForm?: string;
  quantity?: [];
  requiresPrescription?: boolean;
  isAvailable?: boolean;
  price?: [];
}
