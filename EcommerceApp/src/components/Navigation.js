import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../constants/colors';

export const CartIcon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.push('Cart')}
      style={{ paddingHorizontal: 10 }}
    >
      <Image
        source={require('../assets/images/cart-outline.png')}
        style={{ width: 25, height: 25 }}
      />
    </TouchableOpacity>
  );
};

export const CloseIcon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.pop()}
      style={{ paddingHorizontal: 10 }}
    >
      <Image
        source={require('../assets/images/close-outline.png')}
        style={{ width: 25, height: 25, tintColor: colors.brand }}
      />
    </TouchableOpacity>
  );
};

export const TabBarIcon = ({ size, routeName, color }) => {
  let src = require('../assets/images/home-outline.png');

  if (routeName === 'Explore') {
    src = require('../assets/images/apps-outline.png');
  }

  if (routeName === 'Account') {
    src = require('../assets/images/person-circle-outline.png');
  }

  return (
    <Image
      source={src}
      style={{
        width: size,
        height: size,
        tintColor: color,
      }}
    />
  );
};
