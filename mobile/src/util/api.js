import { useQuery, useMutation } from 'react-query';
import { API_URL } from '@env';
import { useStripe } from '@stripe/stripe-react-native';

import { useAuth } from './auth';

export const useSignIn = () => {
  const setToken = useAuth(state => state.setToken);

  return useMutation(
    ({ email, password }) => {
      return appFetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
    },
    {
      onSuccess: data => {
        if (!data.token) {
          throw new Error(data.message);
        }

        setToken(data.token);
      },
    },
  );
};

export const useSignUp = () => {
  const setToken = useAuth(state => state.setToken);

  return useMutation(
    ({ email, password }) => {
      return appFetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
    },
    {
      onSuccess: data => {
        if (!data.token) {
          throw new Error(data.message);
        }

        setToken(data.token);
      },
    },
  );
};

export const usePayment = (cart = {}) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const token = useAuth(state => state.token);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ cart }),
    });

    return response.json();
  };

  const checkout = async () => {
    // create a payment intent
    const { paymentIntent, customer, ephemeralKey } =
      await fetchPaymentSheetParams();

    // initial client side payment sheet
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: paymentIntent,
      customerEphemeralKeySecret: ephemeralKey,
      customerId: customer,
    });

    // display client side payment sheet
    if (!error) {
      return presentPaymentSheet({ clientSecret: paymentIntent });
    }

    // return errors
    return { error };
  };

  return { checkout };
};

const appFetch = (path, options = {}) =>
  fetch(`${API_URL}${path}`, options).then(res => res.json());

export const useHomeData = () => {
  return useQuery('home', () => {
    return appFetch('/products/trending');
  });
};

export const useExploreData = () => {
  return useQuery('explore', () => {
    return appFetch('/products/explore');
  });
};

export const useDetailData = ({ id }) => {
  return useQuery(`detail-${id}`, () => {
    return appFetch(`/product/${id}`);
  });
};
