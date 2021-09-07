import React from 'react';
import { Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../constants/colors';
import { useCart, cartQuantity } from '../util/cart';

const styles = StyleSheet.create({
  headerIconEmbellishment: {
    position: 'absolute',
    backgroundColor: colors.brand,
    borderRadius: 10,
    width: 15,
    height: 15,
    top: -8,
    right: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  embellishmentText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export const CartIcon = () => {
  const navigation = useNavigation();
  const cart = useCart(state => state.cart);
  const quantity = cartQuantity(cart);

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.push('Cart')}
        style={{ paddingHorizontal: 10 }}
      >
        <Image
          source={require('../assets/images/cart-outline.png')}
          style={{ width: 25, height: 25 }}
        />
      </TouchableOpacity>
      {quantity > 0 && (
        <View style={styles.headerIconEmbellishment}>
          <Text style={styles.embellishmentText}>{quantity}</Text>
        </View>
      )}
    </View>
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

  if (routeName === 'ExploreTab') {
    src = require('../assets/images/apps-outline.png');
  }

  if (routeName === 'AccountTab') {
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
