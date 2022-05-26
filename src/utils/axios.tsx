import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useCustomAxios = (): AxiosInstance => {
  const customAxios = axios.create();

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        return value;
      }
    } catch (e) {
      return undefined;
    }
  };
  customAxios.interceptors.request.use(async (req: AxiosRequestConfig) => {
    await adminHeaderAdd(req);
    return req;
  });

  const adminHeaderAdd = async (req: AxiosRequestConfig) => {
    const acesToken: string | undefined = await getToken();
    const headers = req.headers as {Authorization: string};
    headers.Authorization = acesToken ? acesToken : '';
  };
  return customAxios;
};
