// I wrote this code

import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Separator from './Separator';
import { formattedDate, areDatePartEqual } from './Helper';

// HabitDetail Screen where Display details of selected habit is shown, remove a habit item, update the status, habit analysis
// is shown
const HabitDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const [habit, setHabit] = useState();  
  const [status, setStatus] = useState();

  useEffect(() => {
    async function getHabitDetails() {
      const jsonValue = await AsyncStorage.getItem('habits');
      const data = JSON.parse(jsonValue);
      let index = -1;
      for (let i = 0; i < data.habits.length; i++) {
        if (data.habits[i].id == id) {
          index = i;
          break;
        }
      }
      setHabit(data.habits[index]);      
    }

    async function getStatus() {
      const jsonValue = await AsyncStorage.getItem('status');
      const data = JSON.parse(jsonValue);
      let index = -1;
      for (let i = 0; i < data.items.length; i++) {
        if (data.items[i].id == id) {
          index = i;
          break;
        }
      }
      for (let item of data.items[index].values) {
        if (areDatePartEqual(new Date(item.date), new Date())) {
          setStatus(item.done);
        }
      }
    }
    getHabitDetails();
    getStatus();
  }, [id]);

  const showConfirmDialog = () => {
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to remove this habit?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            await deleteHabit();
          },
        },
        {
          text: 'No',
        },
      ]
    );
  };

  // deletes the habit item
  const deleteHabit = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('habits');      
      const data = JSON.parse(jsonValue);
      let index = -1;
      for (let i = 0; i < data.habits.length; i++) {
        if (data.habits[i].id == id) {
          index = i;
          break;
        }
      }
      if (index > -1) {
        data.habits.splice(index, 1);
        const jsonString = JSON.stringify(data);
        await AsyncStorage.setItem('habits', jsonString);
        navigation.navigate('Habits Builder');
      }
    } catch (e) {
      alert('error!');
    }
  };

  // updates the status for today
  const updateStatus = async (doneStatus) => {
    try {
      const jsonValue = await AsyncStorage.getItem('status');
      if (!jsonValue) {
        const statusData = {
          items: [
            {
              id: id,
              values: [{ date: new Date().toDateString(), done: doneStatus }],
            },
          ],
        };
        const jsonString = JSON.stringify(statusData);
        await AsyncStorage.setItem('status', jsonString);
        setStatus(doneStatus);
        alert('status updated');
      } else {
        const data = JSON.parse(jsonValue);
        let index = -1;
        for (let i = 0; i < data.items.length; i++) {
          if (data.items[i].id == id) {
            index = i;
            break;
          }
        }
        if (index > -1) {
          data.items[index].values.push({
            date: new Date().toDateString(),
            done: doneStatus,
          });
        } else {
          data.items.push({
            id: id,
            values: [{ date: new Date().toDateString(), done: doneStatus }],
          });
        }

        const jsonString = JSON.stringify(data);
        await AsyncStorage.setItem('status', jsonString);
        setStatus(doneStatus);
        alert('status updated');
      }
    } catch (e) {
      alert('error!');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.dateView}>
        <Text style={styles.dateText}>{formattedDate(new Date())}</Text>
      </View>
      <Separator />
      <View style={styles.rowFlexContainer}>
        <View style={styles.habitDetailTextView}>
          <Text> {habit && habit.text} </Text>
          <Text> Done: {status ? status : 'not yet'} </Text>
        </View>
        <View style={{ flex: 1, margin: 5 }}>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => showConfirmDialog()}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      {!status && (
        <View style={{ marginTop: 50 }}>
          <Text> Did I &#x1F64B; do {habit && habit.text} today? </Text>
          <View style={styles.rowFlexContainer}>
            <View style={{ flex: 1, margin: 5 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => updateStatus('Yes')}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, margin: 5 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => updateStatus('No')}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 2,
  },
  rowFlexContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 2,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#96DED1',
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 600,
  },
  dateText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 800,
    color: '#708090',
  },
  dateView: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-end',
    alignItems: 'center',
    margin: 8,
  },
  deleteButton: {
    backgroundColor: '#DE3163',
  },
  habitDetailTextView: {
    flex: 1,
    margin: 5,
    alignItems: 'left',
    justifyContent: 'center',
  },
});

export default HabitDetail;
