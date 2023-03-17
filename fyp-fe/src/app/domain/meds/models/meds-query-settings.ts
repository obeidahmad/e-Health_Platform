export interface MedsQuerySettings {
  pageNumber: number;
  pageSize: number;
  searchText?: string;
  medClass?: string;
  medForm?: string;
  quantity?: { [min: string]: [max: string] };
  requiresPrescription?: boolean;
  isAvailable?: boolean;
  price?: { [min: string]: [max: string] };
}
