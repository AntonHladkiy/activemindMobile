/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {AppStack} from './src/providers/AppStack';
import {UserProvider} from './src/providers/UserProvider';
import {ProjectProvider} from './src/providers/ProjectProvider';
import {CategoryProvider} from './src/providers/CategoriesProvider';

const App = () => {
  return (
    <UserProvider>
      <ProjectProvider>
        <CategoryProvider>
          <AppStack />
        </CategoryProvider>
      </ProjectProvider>
    </UserProvider>
  );
};
export default App;
