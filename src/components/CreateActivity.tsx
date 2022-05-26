import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {ProjectContext} from '../providers/ProjectProvider';
import {CategoryContext} from '../providers/CategoriesProvider';
import {
  Activity,
  ActivityResponse,
  useSaveActivity,
  useUpdateActivity,
} from '../api/activitiesApi';
import DatePicker from 'react-native-date-picker';
import SelectDropdown from 'react-native-select-dropdown';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../providers/UserProvider';

export type Props = {
  activity: Activity & {id: number};
  dateProp: Date;
  title: string;
  updateActivities: () => void;
};

export function CreateActivity(props: Props) {
  const navigation = useNavigation();
  const {currentUser} = useContext(UserContext);
  const {projects} = useContext(ProjectContext);
  const {categories} = useContext(CategoryContext);
  const [date, setDate] = useState<Date>(props.route.params.dateProp);
  const [save, response, isLoading, error] = useSaveActivity();
  const [update, responseUpdate, isLoadingUpdate, errorUpdate] =
    useUpdateActivity();
  const [currentActivity, setCurrentActivity] = useState<ActivityResponse>({
    ...props.route.params.activity,
    name: currentUser?.firstName,
  });
  useEffect(() => {
    if (!errorUpdate && responseUpdate) {
      props.route.params.updateActivities();
      navigation.navigate('Dashboard');
    }
    if (!responseUpdate && errorUpdate) {
      Alert.alert('Error', 'Error updating activity', [{text: 'OK'}]);
    }
  }, [errorUpdate, responseUpdate]);
  useEffect(() => {
    if (!error && response) {
      props.route.params.updateActivities();
      navigation.navigate('Dashboard');
    }
    if (!response && error) {
      Alert.alert('Error', 'Error creating activity', [{text: 'OK'}]);
    }
  }, [error, response]);
  useEffect(() => {
    if (date) {
      setCurrentActivity({
        ...currentActivity,
        date: date.toISOString().slice(0, 10),
      });
    }
  }, [date]);
  return (
    <View style={styles.main_container}>
      <View style={styles.container}>
        <Text style={styles.main_text}> Project:</Text>
        <SelectDropdown
          data={projects ? projects : []}
          defaultButtonText={currentActivity.project}
          onSelect={selectedItem => {
            setCurrentActivity({
              ...currentActivity,
              project: selectedItem.name,
            });
          }}
          buttonTextAfterSelection={selectedItem => {
            return selectedItem.name;
          }}
          rowTextForSelection={item => {
            return item.name;
          }}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.main_text}> Category:</Text>
        <SelectDropdown
          data={categories ? categories : []}
          defaultButtonText={currentActivity.category}
          onSelect={selectedItem => {
            setCurrentActivity({
              ...currentActivity,
              category: selectedItem.name,
            });
          }}
          buttonTextAfterSelection={selectedItem => {
            return selectedItem.name;
          }}
          rowTextForSelection={item => {
            return item.name;
          }}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.main_text}> Date:</Text>
        <DatePicker
          mode={'date'}
          date={date}
          onDateChange={setDate}
          androidVariant={'nativeAndroid'}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.main_text}> Hours:</Text>
        <TextInput
          style={styles.input}
          defaultValue={
            currentActivity.hours ? currentActivity.hours.toString() : ''
          }
          keyboardType={'numeric'}
          placeholder={'Hours'}
          onChangeText={value => {
            setCurrentActivity({
              ...currentActivity,
              hours: Number(value),
            });
          }}
        />
      </View>
      <Button
        disabled={
          props.route.params.title === 'Save' ? isLoading : isLoadingUpdate
        }
        onPress={() => {
          props.route.params.title === 'Save'
            ? save(currentActivity)
            : update(currentActivity, currentActivity.id.toString());
        }}
        title={props.route.params.title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 0,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  main_text: {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  input: {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    borderBottomWidth: 1,
    marginLeft: 10,
    marginBottom: 15,
  },
  filter_text: {
    fontSize: 14,
  },
  title_text: {
    fontSize: 12,
  },
});
