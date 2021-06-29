import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Temp = () => null;

const MainTabs = createBottomTabNavigator();
const Tabs = () => (
  <MainTabs.Navigator>
    <MainTabs.Screen name="Home" component={Temp} />
    <MainTabs.Screen name="Explore" component={Temp} />
    <MainTabs.Screen name="Account" component={Temp} />
  </MainTabs.Navigator>
);

const MainStack = createStackNavigator();

export const Main = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Root" component={Tabs} />
  </MainStack.Navigator>
);
