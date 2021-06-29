import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../screens/Home';
import { ProductDetails } from '../screens/ProductDetails';
import { Explore } from '../screens/Explore';
import { Account } from '../screens/Account';

const Temp = () => null;

const HomeStack = createStackNavigator();
const HomeStackNav = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="Details" component={ProductDetails} />
  </HomeStack.Navigator>
);

const ExploreStack = createStackNavigator();
const ExploreStackNav = () => (
  <ExploreStack.Navigator>
    <ExploreStack.Screen name="Explore" component={Explore} />
    <ExploreStack.Screen name="Details" component={ProductDetails} />
  </ExploreStack.Navigator>
);

const AccountStack = createStackNavigator();
const AccountStackNav = () => (
  <AccountStack.Navigator>
    <AccountStack.Screen name="Account" component={Account} />
  </AccountStack.Navigator>
);

const MainTabs = createBottomTabNavigator();
const Tabs = () => (
  <MainTabs.Navigator>
    <MainTabs.Screen name="Home" component={HomeStackNav} />
    <MainTabs.Screen name="Explore" component={ExploreStackNav} />
    <MainTabs.Screen name="Account" component={AccountStackNav} />
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
