import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const CartIcon = () => {
  const navigation = useNavigation();
  return <Button title="Cart" onPress={() => navigation.push('Cart')} />;
};
