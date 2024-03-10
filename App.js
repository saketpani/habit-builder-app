// I wrote this code

import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Separator from './components/Separator';
import Quote from './components/Quote';
import Greeting from './components/Greeting';
import About from './components/About';
import HabitDetail from './components/HabitDetail';

import { formattedDate, newGuid, areDatePartEqual } from './components/Helper';

const Stack = createNativeStackNavigator();

// Main App
const App = () => {
  const headerTitleAlign = { headerTitleAlign: 'center' };

  const [userSettings, setUserSettings] = useState();

  // User Settings Screen
  const UserSettings = ({ navigation }) => {
    const [name, setName] = useState('');

    // getHabits api call declaration
    const saveUserSettings = async () => {
      const jsonValue = name;
      setUserSettings(name);
      await AsyncStorage.setItem('userSettings', jsonValue);
      navigation.navigate('Habits Builder');
    };

    useEffect(() => {
      async function getData() {
        const jsonValue = await AsyncStorage.getItem('userSettings');
        setName(jsonValue);
      }

      getData();
    }, []);

    return (
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.addHabitInputBox}
          placeholder="Your Name"
          onChangeText={(newText) => setName(newText)}
          defaultValue={name}
        />
        <View style={styles.singleBtnView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => saveUserSettings()}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  // Home View
  const Home = ({ navigation }) => {
    const [targetDate, setTargetDate] = useState(new Date());
    const [habitsData, setHabitsData] = useState();
    const [showAdd, setShowAdd] = useState(false);
    const [text, setText] = useState('');

    const saveHabit = async () => {
      try {
        let jsonValue = await AsyncStorage.getItem('habits');
        const data = JSON.parse(jsonValue);
        data.habits.push({
          id: newGuid(),
          text: text,
        });
        jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('habits', jsonValue);
        setHabitsData(data);
        setShowAdd(false);
        setText('');
      } catch (e) {
        // saving error
      }
    };

    useEffect(() => {
      async function getData() {
        const jsonValue = await AsyncStorage.getItem('habits');
        if (jsonValue) {
          const data = JSON.parse(jsonValue);
          setHabitsData(data);
        } else {
          const data = {
            habits: [],
          };
          setHabitsData(data);
          const jsonValue = JSON.stringify(data);
          await AsyncStorage.setItem('habits', jsonValue);
        }
      }

      getData();
    }, [habitsData]);

    useEffect(() => {
      async function getData() {
        const jsonValue = await AsyncStorage.getItem('habits');
        if (jsonValue) {
          const data = JSON.parse(jsonValue);
          setHabitsData(data);
        } else {
          const data = {
            habits: [],
          };
          setHabitsData(data);
          const jsonValue = JSON.stringify(data);
          await AsyncStorage.setItem('habits', jsonValue);
        }
      }

      getData();
    }, []);

    const isDone = async (id) => {
      if (!id) {
        return false;
      }
      let doneValue = false;
      const jsonValue = await AsyncStorage.getItem('status');
      if (jsonValue) {
        const data = JSON.parse(jsonValue);
        console.log(data.items.length);
        for (let i = 0; i < data.items.length; i++) {
          if (data.items[i].id == id) {
            console.log('found');
            const values = data.items[i].values;
            for (const item of values) {
              if (areDatePartEqual(new Date(item.date), new Date())) {
                console.log('matched');
                doneValue = item.done;
                break;
              }
            }
          }
        }
      }

      return doneValue;
    };

    const ShowTick = (
      <View>
        <Text> Yes </Text>
      </View>
    );

    return (
      <ScrollView style={styles.container}>
        <View style={{ backgroundColor: '#fefefe' }}>
          <Greeting {...userSettings} />
          <View style={styles.dateView}>
            <Text style={styles.dateText}>
              TODAY: {formattedDate(targetDate)}
            </Text>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowAdd(!showAdd)}>
                <Text style={styles.buttonText}>&#x2795; Add</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {showAdd && (
              <View>
                <TextInput
                  style={styles.addHabitInputBox}
                  placeholder="Add Habit"
                  onChangeText={(newText) => setText(newText)}
                  defaultValue={text}
                />
                <TouchableOpacity
                  style={[styles.button, { margin: 20 }]}
                  onPress={() => saveHabit()}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <ScrollView>
            <TableView>
              <Section>
                {habitsData &&
                  habitsData.habits.map((item, i) => (
                    <Cell
                      cellStyle="Basic"
                      cellContentView={
                        <View style={styles.homeCellContentMainView}>
                          <Text style={styles.titleText}>
                            &#x1F4CC; {item.text}
                          </Text>
                        </View>
                      }
                      onPress={() =>
                        navigation.navigate('Habit Detail', { id: item.id })
                      }
                    />
                  ))}
              </Section>
            </TableView>
          </ScrollView>
          <Separator />
          <Quote />
          <View style={styles.rowFlexContainer}>
            <View style={styles.btnView}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('User Settings')}>
                <Text style={styles.buttonText}>My Settings</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnView}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('About')}>
                <Text style={styles.buttonText}>About</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Habits Builder"
          component={Home}
          options={headerTitleAlign}
        />
        <Stack.Screen
          name="Habit Detail"
          component={HabitDetail}
          options={headerTitleAlign}
        />
        <Stack.Screen
          name="User Settings"
          component={UserSettings}
          options={headerTitleAlign}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={headerTitleAlign}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
  homeCellContentMainView: {
    backgroundColor: '#96DED1',
    borderRadius: 6,
    color: '#FFF',
    flex: 1,
    marginBottom: 10,
    flexDirection: 'column',
    padding: 15,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 600,
    color: '#36454F',
  },
  addHabitInputBox: {
    height: 70,
    borderWidth: 4,
    borderRadius: 5,
    borderColor: '#cecece',
    margin: 16,
    padding: 10,
  },
  btnView: { flex: 1, margin: 5 },
  singleBtnView:{
    margin: 15
  }

});

export default App;

// end of code I wrote
