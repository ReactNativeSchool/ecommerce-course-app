import React from 'react';

import { useExploreData } from '../util/api';
import { Loading } from '../components/Loading';

export const Explore = () => {
  const { isLoading, data } = useExploreData();

  if (isLoading) {
    return <Loading />;
  }

  console.log(data);
  return null;
};
