import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { Text } from '../components/Text';
import colors from '../constants/colors';
import { useCart, cartTotal } from '../util/cart';
import { CartRow } from '../components/CartRow';
import { money } from '../util/format';

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingTop: 60,
  },
  summaryContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

export const Cart = () => {
  const { cart } = useCart(state => ({ cart: state.cart }));

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
      {Object.keys(cart).map(id => (
        <CartRow key={id} id={id} />
      ))}
      <View style={styles.summaryContainer}>
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Total: </Text>
          {money(cartTotal(cart))}
        </Text>
      </View>
    </ScrollView>
  );
};
