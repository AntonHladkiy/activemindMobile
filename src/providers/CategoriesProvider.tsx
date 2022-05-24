import React, {ReactElement, useEffect, useState} from 'react';
import {Category, useGetCategories} from '../api/categoriesApi';

interface ContextType {
  categories: Category[] | null;
  updateCategories: () => void;
}

export const CategoryContext = React.createContext({} as ContextType);

interface Props {
  children: React.ReactNode;
}

export const CategoryProvider = ({children}: Props): ReactElement => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [updateCategories, categoriesResponse] = useGetCategories();
  useEffect(() => {
    if (categoriesResponse) {
      setCategories(categoriesResponse);
    }
  }, [categoriesResponse]);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        updateCategories,
      }}>
      {children}
    </CategoryContext.Provider>
  );
};
