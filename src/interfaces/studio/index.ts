import { RenamedpackageInterface } from 'interfaces/renamedpackage';
import { ProjectInterface } from 'interfaces/project';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface StudioInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  Renamedpackage?: RenamedpackageInterface[];
  project?: ProjectInterface[];
  user?: UserInterface;
  _count?: {
    Renamedpackage?: number;
    project?: number;
  };
}

export interface StudioGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
