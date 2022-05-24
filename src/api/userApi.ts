import {UserInfo} from '../providers/UserProvider';
import {HOST} from '../../env';
import {usePost} from './template/usePost';
import {useGetAll} from './template/useGetAll';

interface UserAuthInfo {
  email: string;
  password: string;
}

export type UserData = UserInfo & {
  id: string;
};
type UserLoginInfo = {user: UserInfo; token: string};
export const useLogIn = () => {
  return usePost<UserAuthInfo, UserLoginInfo>(`${HOST}auth`);
};

export const useGetAllDeveloperUsers = () => {
  return useGetAll<UserData[]>(`${HOST}users`);
};
