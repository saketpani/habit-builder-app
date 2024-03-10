// I wrote this code

import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

// a separator horizontal line
const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    marginVertical: 10,
    borderBottomColor: '#d8d8d8',
    borderWidth: 1,
    borderColor: "#cecece",
    margin: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Separator;

// end of code I wrote