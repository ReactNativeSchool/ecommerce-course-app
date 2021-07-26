import React from 'react';
import { ScrollView, View, Image, StyleSheet } from 'react-native';

import { Text } from '../components/Text';
import colors from '../constants/colors';
import { money } from '../util/format';
import { useDetailData } from '../util/api';
import { Loading } from '../components/Loading';
import { QuantityCounter } from '../components/QuantityCounter';
import { useCart } from '../util/cart';

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: colors.white,
    marginVertical: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    flexDirection: 'row',
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 15,
  },
});

export const ProductDetails = ({ route }) => {
  const staticData = route.params;
  const { data, isSuccess, isLoading } = useDetailData({ id: route.params.id });
  const cart = useCart(state => ({
    quantity: state.cart[route.params.id]?.quantity || 0,
    addItem: state.addItem,
    removeItem: state.removeItem,
  }));

  let { image, name, price } = staticData;
  let description;
  if (isSuccess) {
    image = data.data.image;
    name = data.data.name;
    price = data.data.price;
    description = data.data.description;
  }

  return (
    <>
      <ScrollView>
        <View style={styles.section}>
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={{ flex: 1 }}>
            <Text type="header">{name}</Text>
            <Text type="subheader" style={{ marginTop: 5 }}>
              {money(price)}
            </Text>
          </View>
        </View>

        <View style={[styles.section, { flexDirection: 'column' }]}>
          <Text type="header">Description</Text>
          {isLoading ? <Loading /> : <Text>{description}</Text>}
        </View>
      </ScrollView>
      <QuantityCounter
        price={price}
        quantity={cart.quantity}
        onDecrement={() => cart.removeItem(route.params.id)}
        onIncrement={() => cart.addItem({ id: route.params.id, name, price })}
      />
    </>
  );
};
