import { AssignmentInterface } from 'interfaces/assignment';
import { MediaInterface } from 'interfaces/media';
import { StudioInterface } from 'interfaces/studio';
import { GetQueryInterface } from 'interfaces';

export interface ProjectInterface {
  id?: string;
  name: string;
  deadline: any;
  studio_id?: string;
  created_at?: any;
  updated_at?: any;
  assignment?: AssignmentInterface[];
  media?: MediaInterface[];
  studio?: StudioInterface;
  _count?: {
    assignment?: number;
    media?: number;
  };
}

export interface ProjectGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  studio_id?: string;
}
