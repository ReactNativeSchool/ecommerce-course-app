import React from 'react';
import {
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
} from 'react-native';

import { Text } from './Text';
import { money } from '../util/format';
import colors from '../constants/colors';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  itemCard: {
    flex: 1,
    padding: 10,
  },
  itemImage: {
    width: screen.width * 0.4,
    height: screen.width * 0.4,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  sectionHeader: {
    paddingTop: 10,
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },
});

export const ItemCard = ({ name, price, onPress, image }) => (
  <TouchableOpacity style={styles.itemCard} onPress={onPress}>
    <Image
      source={{ uri: image }}
      style={styles.itemImage}
      resizeMode="cover"
    />
    <Text style={styles.cardTitle}>{name}</Text>
    <Text>{money(price)}</Text>
  </TouchableOpacity>
);

export const SectionHeader = ({ children }) => (
  <View style={styles.sectionHeader}>
    <Text type="header">{children}</Text>
  </View>
);

export const SectionFooter = () => (
  <View style={{ flex: 1, backgroundColor: colors.border, height: 1 }} />
);
