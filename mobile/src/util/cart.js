import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const cartQuantity = cart => {
  let quantity = 0;

  Object.keys(cart).forEach(id => {
    const item = cart[id];
    quantity += item.quantity;
  });

  return quantity;
};

export const cartTotal = cart => {
  let total = 0;

  Object.keys(cart).forEach(id => {
    const item = cart[id];
    total += item.price * item.quantity;
  });

  return total;
};

export const useCart = create(
  persist(
    set => ({
      cart: {},
      addItem: ({ id, name, price }) => {
        set(state => {
          // cart.123 = { name: 'hello', price: 1999 }

          const cart = { ...state.cart };
          if (!cart[id]) {
            cart[id] = {
              id,
              name,
              price,
              quantity: 0,
            };
          }

          cart[id].quantity += 1;

          return { cart };
        });
      },
      removeItem: id => {
        set(state => {
          const cart = { ...state.cart };

          if (!cart[id]) {
            return { cart };
          }

          const newQuantity = cart[id].quantity - 1;
          if (newQuantity <= 0) {
            delete cart[id];
          } else {
            cart[id].quantity = newQuantity;
          }

          return { cart };
        });
      },
      clearCart: () => set(() => ({ cart: {} })),
    }),
    {
      name: 'cart',
      getStorage: () => AsyncStorage,
    },
  ),
);
