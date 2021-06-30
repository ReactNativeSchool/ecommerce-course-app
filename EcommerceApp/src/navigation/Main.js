import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../screens/Home';
import { ProductDetails } from '../screens/ProductDetails';
import { Explore } from '../screens/Explore';
import { Account } from '../screens/Account';
import { Cart } from '../screens/Cart';

import { CartIcon } from '../components/Navigation';

const tabStackScreenOptions = {
  headerRight: () => <CartIcon />,
};

const HomeStack = createStackNavigator();
const HomeStackNav = () => (
  <HomeStack.Navigator screenOptions={tabStackScreenOptions}>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="Details" component={ProductDetails} />
  </HomeStack.Navigator>
);

const ExploreStack = createStackNavigator();
const ExploreStackNav = () => (
  <ExploreStack.Navigator screenOptions={tabStackScreenOptions}>
    <ExploreStack.Screen name="Explore" component={Explore} />
    <ExploreStack.Screen name="Details" component={ProductDetails} />
  </ExploreStack.Navigator>
);

const AccountStack = createStackNavigator();
const AccountStackNav = () => (
  <AccountStack.Navigator screenOptions={tabStackScreenOptions}>
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
  <MainStack.Navigator mode="modal">
    <MainStack.Screen
      name="Root"
      component={Tabs}
      options={{ headerShown: false }}
    />
    <MainStack.Screen name="Cart" component={Cart} />
  </MainStack.Navigator>
);
