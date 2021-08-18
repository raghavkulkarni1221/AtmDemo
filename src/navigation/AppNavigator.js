import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Pin from '../components/Pin';
import Menu from '../components/Menu';
import ChangePin from '../components/ChangePin';
import BalanceEnquiry from '../components/BalanceEnquiry';
import AmountScreen from '../components/AmountScreen';
import Denominations from '../components/Denominations';
 
const MyAppTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white'
    },
  };

const Stack = createStackNavigator();

export default function AppNavigator() {
  return(
    <NavigationContainer theme={MyAppTheme}>
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Pin" component={Pin} />
            <Stack.Screen name="Menu" component={Menu} options={{gestureEnabled: false}}/>
            <Stack.Screen name="ChangePin" component={ChangePin} />
            <Stack.Screen name="BalanceEnquiry" component={BalanceEnquiry} />
            <Stack.Screen name="AmountScreen" component={AmountScreen} />
            <Stack.Screen name="Denominations" component={Denominations} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}