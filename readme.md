# Introduction
This summarizes the key components used in the mobile app.

# Main App
The App component containing navigation, Home, user settings components are in App.js

# Components 
All the components are in components folder.

# Dependency module

The following are additional modules added.
"@react-native-async-storage/async-storage": "1.21.0",

"@react-navigation/native": "*",
"@react-navigation/native-stack": "*",
"@react-navigation/stack": "*",

"@testing-library/jest-native": "^5.4.3",
"@testing-library/react-native": "^12.4.3",
"core-js": "^3.36.0",
"jest": "^29.7.0",
"jest-expo": "^50.0.3",
"react-native-testing-library": "^6.0.0",

"react-native-tableview-simple": "*",

# Unit testing  
The Unit tests are written in App.test.js and configured in package.json

To run unit test, run the following command

```cmd
npm test
```

# app configuration json
env.json file is used to store the API url and key. It also has content to display in About screen. 


# Opening and Running the application

1. Extract the zip and open the habit-builder-app in VS code IDE
2. Go to "habit-builder-app" directory. 
3. Ensure the dependency modules are installed. run "npm install" to install the modules.
4. To run the application in the "habit-builder-app" directory, run the following command

```cmd
npx expo start 

for clean rebuild and run the following command

```cmd
npx expo start -c

5. Select w for web or a for android.
6. If app is run on Android emulator then ensure the emulator is running by going to  Android Studio -> Device Manager from Windows Machine -> Start Device.
