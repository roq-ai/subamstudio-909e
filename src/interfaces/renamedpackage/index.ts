import { StudioInterface } from 'interfaces/studio';
import { GetQueryInterface } from 'interfaces';

export interface RenamedpackageInterface {
  id?: string;
  name: string;
  type: string;
  price: number;
  studio_id?: string;
  created_at?: any;
  updated_at?: any;

  studio?: StudioInterface;
  _count?: {};
}

export interface RenamedpackageGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  type?: string;
  studio_id?: string;
}
