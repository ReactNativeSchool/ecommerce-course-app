import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Text } from './Text';
import { money } from '../util/format';
import { Counter } from './QuantityCounter';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export const CartRow = ({ name, quantity, price }) => {
  return (
    <View style={styles.row}>
      <View>
        <Text style={{ fontWeight: 'bold' }}>{name}</Text>
        <Text>{money(price)}</Text>
      </View>
      <Counter quantity={quantity} type="small" />
    </View>
  );
};
