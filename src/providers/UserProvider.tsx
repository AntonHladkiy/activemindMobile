import React, {ReactElement, useEffect, useState} from 'react';
import {UserRole} from '../entity/enums/UserRole';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserInfo {
  firstName: string;
  lastName: string;
  role: UserRole;
}

interface ContextType {
  resetUser: () => void;
  updateUser: () => void;
  currentUser: UserInfo | null | undefined;
}

export const UserContext = React.createContext({} as ContextType);

interface Props {
  children: React.ReactNode;
}

export const UserProvider = ({children}: Props): ReactElement => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [updater, setUpdater] = useState(true);
  const resetUser = () => {
    setUser(null);
    removeToken();
    removeUser();
  };
  const updateUser = () => setUpdater(!updater);
  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (e) {
      // saving error
    }
  };
  const removeUser = async () => {
    try {
      await AsyncStorage.removeItem('user');
    } catch (e) {
      // saving error
    }
  };
  useEffect(() => {
    getUser().then(currentUser => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
  }, [updater]);

  return (
    <UserContext.Provider
      value={{
        resetUser,
        updateUser,
        currentUser: user,
      }}>
      {children}
    </UserContext.Provider>
  );
};
