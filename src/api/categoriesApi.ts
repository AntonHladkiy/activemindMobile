import {HOST} from '../../env';
import {useGetAll} from './template/useGetAll';

export interface Category {
  name: string;
}

export const useGetCategories = () => {
  return useGetAll<Category[]>(`${HOST}categories`);
};
