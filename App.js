/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenTwo from './src/screens/ScreenTwo';
import Header from './src/components/Header';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='news'
          component={Header}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name='Details' component={ScreenTwo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
