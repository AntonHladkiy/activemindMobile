import React, {useContext, useEffect} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import {useLogIn} from '../api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext, UserInfo} from '../providers/UserProvider';
import {ProjectContext} from '../providers/ProjectProvider';
import {CategoryContext} from '../providers/CategoriesProvider';

export const Login = () => {
  const {updateUser} = useContext(UserContext);
  const {updateProjects} = useContext(ProjectContext);
  const {updateCategories} = useContext(CategoryContext);
  const [logIn, response, isLoading, error] = useLogIn();
  const storeToken = async (token: string) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (e) {}
  };
  const storeUser = async (user: UserInfo) => {
    try {
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem('user', jsonValue);
    } catch (e) {}
  };
  useEffect(() => {
    console.log(error, response);
    if (!error && response) {
      storeToken(response.token);
      storeUser(response.user).then(() => {
        updateUser();
        updateProjects();
        updateCategories();
      });
    }
  }, [response, error]);
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={values => logIn(values)}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View style={styles.main_container}>
          <Text>Email:</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            keyboardType={'email-address'}
          />
          <Text>Password:</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            secureTextEntry={true}
            value={values.password}
          />
          <Button disabled={isLoading} onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  input: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
    width: '100%',
  },
  main_container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
    paddingBottom: 0,
  },
  main_text: {
    marginVertical: 5,
    fontSize: 16,
  },
  title_text: {
    fontSize: 12,
  },
});
