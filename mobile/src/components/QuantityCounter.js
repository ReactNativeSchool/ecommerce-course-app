import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../constants/colors';
import { Text } from './Text';
import { money } from '../util/format';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairWidth,
    alignItems: 'center',
  },
  counter: {
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
  },
  button: {},
  buttonText: {
    fontSize: 20,
    paddingVertical: 15,
    paddingHorizontal: 25,
    color: '#707070',
  },
  buttonTextSmall: {
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  quantityText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  priceText: {
    fontWeight: 'bold',
  },
});

export const Counter = ({ onDecrement, onIncrement, quantity, type }) => {
  const buttonTextStyles = [styles.buttonText];
  if (type === 'small') {
    buttonTextStyles.push(styles.buttonTextSmall);
  }

  return (
    <View style={styles.counter}>
      <TouchableOpacity onPress={onDecrement} style={styles.button}>
        <Text style={buttonTextStyles}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantityText}>{quantity}</Text>
      <TouchableOpacity onPress={onIncrement} style={styles.button}>
        <Text style={buttonTextStyles}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export const QuantityCounter = ({
  price,
  quantity = 0,
  onDecrement,
  onIncrement,
}) => {
  return (
    <View style={styles.container}>
      <Counter
        quantity={quantity}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
      />
      <Text style={styles.priceText}>{money(price)}</Text>
    </View>
  );
};
