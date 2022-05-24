import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {UserContext} from '../providers/UserProvider';
import {ProjectContext} from '../providers/ProjectProvider';
import {CategoryContext} from '../providers/CategoriesProvider';
import {
  ActivityFilter,
  ActivityResponse,
  useGetActivities,
} from '../api/activitiesApi';
import {useNavigation} from '@react-navigation/native';
import {ActivityItem} from './ActivityItem';
import {UserRole} from '../entity/enums/UserRole';
import {useGetAllDeveloperUsers, UserData} from '../api/userApi';
import DatePicker from 'react-native-date-picker';
import SelectDropdown from 'react-native-select-dropdown';

export const defaultActivity = {
  id: '',
  project: '',
  category: '',
  date: new Date().toISOString().slice(0, 10),
};

export const defaultActivityFilter = {
  user_id: '',
  project: '',
  category: '',
  date: new Date().toISOString().slice(0, 10),
  page: 1,
};

export function Dashboard() {
  const {currentUser, resetUser} = useContext(UserContext);
  const navigation = useNavigation();
  const {projects} = useContext(ProjectContext);
  const {categories} = useContext(CategoryContext);
  const [users, setUsers] = useState<UserData[]>([]);
  const [activities, setActivities] = useState<ActivityResponse[]>([]);
  const [date, setDate] = useState(new Date());
  const [activityFilter, setActivityFilter] = useState<ActivityFilter>(
    defaultActivityFilter,
  );
  const [updateActivities, activitiesResponse] =
    useGetActivities(activityFilter);
  const [, usersResponse] = useGetAllDeveloperUsers();
  useEffect(() => {
    if (currentUser?.role === UserRole.ADMIN) {
      if (usersResponse) {
        setUsers(usersResponse);
      }
    }
  }, [usersResponse]);
  useEffect(() => {
    if (activityFilter.date !== date.toISOString().slice(0, 10)) {
      setActivityFilter({
        ...activityFilter,
        date: date.toISOString().slice(0, 10),
      });
    } else {
      updateActivities();
    }
  }, [activityFilter]);
  useEffect(() => {
    if (date) {
      setActivityFilter({
        ...activityFilter,
        date: date.toISOString().slice(0, 10),
      });
    }
  }, [date]);
  useEffect(() => {
    if (activitiesResponse) {
      setActivities(activitiesResponse);
    }
  }, [activitiesResponse]);
  // @ts-ignore
  const renderItem = ({item}: {item: ActivityResponse}) => (
    <ActivityItem
      activity={item}
      date={date}
      updateActivities={updateActivities}
    />
  );
  return (
    <ScrollView contentContainerStyle={styles.main_container}>
      {currentUser?.role === UserRole.ADMIN && (
        <>
          <Text style={styles.main_text}>Filters:</Text>
          <View style={styles.filter_container}>
            <SelectDropdown
              dropdownStyle={styles.dropdown}
              buttonStyle={styles.dropdown}
              buttonTextStyle={styles.filter_text}
              data={projects ? projects : []}
              defaultButtonText={'Project filter'}
              onSelect={selectedItem => {
                setActivityFilter({
                  ...activityFilter,
                  project: selectedItem.name,
                });
              }}
              buttonTextAfterSelection={selectedItem => {
                return selectedItem.name === activityFilter.project
                  ? selectedItem.name
                  : 'Project filter';
              }}
              rowTextForSelection={item => {
                return item.name;
              }}
            />
            <SelectDropdown
              dropdownStyle={styles.dropdown}
              buttonStyle={styles.dropdown}
              buttonTextStyle={styles.filter_text}
              data={categories ? categories : []}
              defaultButtonText={'Category filter'}
              onSelect={selectedItem => {
                setActivityFilter({
                  ...activityFilter,
                  category: selectedItem.name,
                });
              }}
              buttonTextAfterSelection={selectedItem => {
                return selectedItem.name === activityFilter.category
                  ? selectedItem.name
                  : 'Category filter';
              }}
              rowTextForSelection={item => {
                return item.name;
              }}
            />
            <SelectDropdown
              dropdownStyle={styles.dropdown}
              buttonStyle={styles.dropdown}
              buttonTextStyle={styles.filter_text}
              data={users ? users : []}
              defaultButtonText={'User filter'}
              onSelect={selectedItem => {
                setActivityFilter({
                  ...activityFilter,
                  user_id: selectedItem.id,
                });
              }}
              buttonTextAfterSelection={selectedItem => {
                return selectedItem.id === activityFilter.user_id
                  ? selectedItem.firstName + selectedItem.lastName
                  : 'User filter';
              }}
              rowTextForSelection={item => {
                return item.firstName + item.lastName;
              }}
            />
          </View>
          <Button
            onPress={() => {
              setActivityFilter(defaultActivityFilter);
            }}
            title={'Clear filters'}
          />
        </>
      )}
      <Text style={styles.main_text}>Date filter:</Text>
      <DatePicker
        style={{height: 150}}
        mode={'date'}
        date={date}
        onDateChange={setDate}
        androidVariant={'nativeAndroid'}
      />
      <Text style={styles.main_text}>Activities:</Text>
      <FlatList
        style={{height: 200}}
        data={activities}
        renderItem={renderItem}
      />
      <View>
        <View style={{marginVertical: 5}}>
          <Button
            onPress={() =>
              navigation.navigate('CreateActivity', {
                activity: defaultActivity,
                dateProp: new Date(),
                title: 'Save',
                updateActivities: updateActivities,
              })
            }
            title={'Create Activity'}
          />
        </View>
        <Button onPress={() => resetUser()} title={'Log Out'} />
      </View>
    </ScrollView>
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
  dropdown: {
    borderWidth: 0,
    width: '33%',
    padding: 0,
  },
  filter_container: {
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  main_text: {
    marginVertical: 5,
    fontSize: 16,
  },
  filter_text: {
    fontSize: 14,
  },
  title_text: {
    fontSize: 12,
  },
});
