import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  Activity,
  ActivityResponse,
  useDeleteActivity,
} from '../api/activitiesApi';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../providers/UserProvider';
import {UserRole} from '../entity/enums/UserRole';
import Icon from 'react-native-vector-icons/AntDesign';

export type Props = {
  activity: Activity & {id: number};
  date: Date;
  updateActivities: () => void;
};

export function ActivityItem(props: Props) {
  const navigation = useNavigation();
  const {currentUser} = useContext(UserContext);
  const [setId, response, isLoading, error] = useDeleteActivity();
  const [currentActivity] = useState<ActivityResponse>(props.activity);
  return (
    <View style={styles.activity_container}>
      {currentUser?.role === UserRole.ADMIN && (
        <View style={styles.data_container}>
          <Text style={styles.title_text}>Developer name:</Text>
          <Text style={styles.main_text}>{currentActivity?.name}</Text>
        </View>
      )}
      <View style={styles.data_container}>
        <Text style={styles.title_text}>Project:</Text>
        <Text style={styles.main_text}>{currentActivity.project}</Text>
      </View>
      <View style={styles.data_container}>
        <Text style={styles.title_text}>Category:</Text>
        <Text style={styles.main_text}>{currentActivity.category}</Text>
      </View>
      <View style={styles.data_container}>
        <Text style={styles.title_text}>Hours:</Text>
        <Text style={styles.main_text}>{currentActivity.hours}</Text>
      </View>
      <TouchableOpacity
        disabled={isLoading}
        onPress={() =>
          navigation.navigate('CreateActivity', {
            activity: currentActivity,
            dateProp: props.date,
            title: 'Edit',
            updateActivities: props.updateActivities,
          })
        }>
        <Icon name="edit" size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={isLoading}
        onPress={() => {
          setId(currentActivity.id.toString());
          props.updateActivities();
        }}>
        <Icon name="delete" size={25} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  activity_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  data_container: {marginLeft: 5, marginRight: 5},
  main_text: {
    marginVertical: 5,
    fontSize: 16,
  },
  title_text: {
    fontSize: 12,
  },
});
