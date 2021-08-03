import { useQuery } from 'react-query';
import { API_URL } from '@env';
import { useStripe } from '@stripe/stripe-react-native';

export const usePayment = (cart = {}) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart }),
    });

    return response.json();
  };

  const checkout = async () => {
    // create a payment intent
    const { paymentIntent } = await fetchPaymentSheetParams();

    // initial client side payment sheet
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: paymentIntent,
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
