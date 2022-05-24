import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useEffect} from 'react';
import {Login} from '../components/Login';
import {Dashboard} from '../components/Dashboard';
import {UserContext} from './UserProvider';
import {NavigationContainer} from '@react-navigation/native';
import {CreateActivity} from '../components/CreateActivity';

const Stack = createStackNavigator();

export function AppStack() {
  const {currentUser} = useContext(UserContext);
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
        }}>
        {!currentUser && <Stack.Screen name="Login" component={Login} />}
        {currentUser && (
          <>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen
              options={{title: 'Activity'}}
              name="CreateActivity"
              component={CreateActivity}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
