import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';

import { Text } from '../components/Text';
import colors from '../constants/colors';
import { useCart, cartTotal } from '../util/cart';
import { CartRow } from '../components/CartRow';
import { money } from '../util/format';
import { Button } from '../components/Button';
import { usePayment } from '../util/api';
import { useAuth } from '../util/auth';

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

export const Cart = ({ navigation }) => {
  const { cart, clearCart } = useCart(state => ({
    cart: state.cart,
    clearCart: state.clearCart,
  }));
  const { checkout } = usePayment(cart);
  const token = useAuth(state => state.token);
  const isLoggedIn = token !== null;

  const isEmpty = Object.keys(cart).length === 0;

  const onCheckout = async () => {
    try {
      const res = await checkout();

      if (!res.error) {
        Alert.alert('Success', 'Your order is confirmed.');
        clearCart();
        navigation.popToTop();
        navigation.goBack(null);
      }
    } catch (error) {
      Alert.alert('Sorry', 'Something went wrong.');
      console.log(error);
    }
  };

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

        <View style={{ marginTop: 20 }}>
          {isLoggedIn ? (
            <Button onPress={onCheckout}>Checkout</Button>
          ) : (
            <Button onPress={() => navigation.push('Auth')}>
              Login to Checkout
            </Button>
          )}
        </View>
      </View>
    </ScrollView>
  );
};
