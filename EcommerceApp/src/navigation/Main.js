import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../screens/Home';
import { ProductDetails } from '../screens/ProductDetails';

const Temp = () => null;

const HomeStack = createStackNavigator();
const HomeStackNav = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="Details" component={ProductDetails} />
  </HomeStack.Navigator>
);

const MainTabs = createBottomTabNavigator();
const Tabs = () => (
  <MainTabs.Navigator>
    <MainTabs.Screen name="Home" component={HomeStackNav} />
    <MainTabs.Screen name="Explore" component={Temp} />
    <MainTabs.Screen name="Account" component={Temp} />
  </MainTabs.Navigator>
);

const MainStack = createStackNavigator();

export const Main = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="Root"
      component={Tabs}
      options={{ headerShown: false }}
    />
  </MainStack.Navigator>
);
