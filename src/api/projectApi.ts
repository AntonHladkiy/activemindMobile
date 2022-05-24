import {HOST} from '../../env';
import {useGetAll} from './template/useGetAll';

export interface Project {
  name: string;
}

export const useGetProjects = () => {
  return useGetAll<Project[]>(`${HOST}projects`);
};
