// I wrote this code
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';

import appjson from '../env.json';

// About Page displaying app name, version, contact detail. all the information is fetched from env.json file.
const About = ({ navigation }) => {
  const title = appjson.appTitle;
  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.aboutImage}>
      <ScrollView contentContainerStyle={styles.container}>
        <TableView>
          <Section
            header={title}
            headerTextStyle={styles.headerTextStyle}
            headerTextColor="#444444">
            <Cell
              cellStyle="Basic"
              titleTextStyle={styles.cellTextStyle}
              titleTextColor="#444444"
              title={appjson.about.appName}
            />
            <Cell
              cellStyle="Basic"
              titleTextStyle={styles.cellTextStyle}
              titleTextColor="#444444"
              title={'App Version: ' + appjson.about.appVersion}
            />
            <Cell
              cellStyle="Basic"
              titleTextStyle={styles.cellTextStyle}
              titleTextColor="#444444"
              title={'Contact Email: ' + appjson.about.contactEmail}
            />
          </Section>
        </TableView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 2,
  },
  aboutImage: {
    width: '100%',
    height: '100%',
  },
  headerTextStyle: { fontSize: 14, fontWeight: 600, alignItems: 'center' },
  cellTextStyle: { fontWeight: 600 },
});

export default About;

// end of code I wrote
