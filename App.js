import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { initializeApp } from "firebase/app";

const Stack = createNativeStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyAK1-x2t2TQCU4BeKUSM5bswW3aHzTjB0A",
  authDomain: "develcode-f3d34.firebaseapp.com",
  databaseURL: "https://develcode-f3d34-default-rtdb.firebaseio.com",
  projectId: "develcode-f3d34",
  storageBucket: "develcode-f3d34.appspot.com",
  messagingSenderId: "626660627089",
  appId: "1:626660627089:web:39cdc0ab2618eba3faa530",
  measurementId: "G-XLVRC4WR28"
};

initializeApp(firebaseConfig)
console.log(`Conexão realizada com sucesso!!`)

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
