import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './src/pages/HomePage';
import DetailPage from './src/pages/DetailPage';
import AddProduct from './src/pages/AddProductPage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App