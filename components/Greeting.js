// I wrote this code

import { Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Greentings component
const Greeting = () => {

  const [name, setName] = useState('');  

  useEffect(() => {
    async function getData() {
      const jsonValue = await AsyncStorage.getItem('userSettings');            
      setName(jsonValue);
    }

    getData();
  }, []);

  return (
    <View style={{ alignItems: 'center', marginTop: 10 }}>
      <Text
        style={{
          fontSize: 18,
          marginBottom: 5,
          alignItems: 'center',
          fontWeight: 600,
        }}>
        Good Morning {name != undefined ? name : 'Guest'}!
      </Text>
    </View>
  );
};

export default Greeting;

// end of code I wrote