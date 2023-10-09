import {MedItem} from "./med-item";

export interface Purchase {
  id: string;
  createdAt: string;
  updatedAt: string;
  medicine: MedItem;
  status: 'bought' | 'reserved';
  user?: any;
}
