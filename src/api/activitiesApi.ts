import {useGetAll} from './template/useGetAll';
import {HOST} from '../../env';
import {useDeleteById} from './template/useDeleteById';
import {usePatch} from './template/usePatch';
import {usePost} from './template/usePost';

export interface Activity {
  project: string;
  category: string;
  hours: number;
  date: string;
  name?: string;
}

export type ActivityResponse = Activity & {
  id: number;
};

export interface ActivityFilter {
  user_id: string;
  project: string;
  category: string;
  date: string;
  page: number;
}

export const useGetActivities = (filter: ActivityFilter) => {
  return useGetAll<ActivityResponse[]>(
    `${HOST}activities?user_id=${filter.user_id}&project=${filter.project}&category=${filter.category}&date=${filter.date}&page=${filter.page}`,
  );
};

export const useDeleteActivity = () => {
  return useDeleteById<null>(`${HOST}activities`);
};

export const useUpdateActivity = () => {
  return usePatch<Activity, ActivityResponse>(`${HOST}activities/`);
};

export const useSaveActivity = () => {
  return usePost<Activity, ActivityResponse>(`${HOST}activities`);
};
