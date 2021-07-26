import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { Text } from '../components/Text';
import colors from '../constants/colors';
import { useCart } from '../util/cart';
import { CartRow } from '../components/CartRow';

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingTop: 60,
  },
});

export const Cart = () => {
  const { cart } = useCart(state => ({ cart: state.cart }));

  console.log('cart', cart);
  const isEmpty = Object.keys(cart).length === 0;

  if (isEmpty) {
    return (
      <View style={styles.emptyContainer}>
        <Text type="header" style={{ fontSize: 25 }}>
          EMPTY CART
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: colors.white }}>
      {Object.keys(cart).map(id => {
        const item = cart[id];

        return (
          <CartRow
            key={id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
          />
        );
      })}
    </ScrollView>
  );
};
