import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Text } from '../components/Text';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingTop: 60,
  },
});

export const Cart = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text type="header" style={{ fontSize: 25 }}>
        EMPTY CART
      </Text>
    </View>
  );
};
