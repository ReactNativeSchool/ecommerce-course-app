import { useQuery } from 'react-query';
import { API_URL } from '@env';

const appFetch = (path, options = {}) =>
  fetch(`${API_URL}${path}`, options).then(res => res.json());

export const useHomeData = () => {
  return useQuery('home', () => {
    return appFetch('/products/trending');
  });
};
