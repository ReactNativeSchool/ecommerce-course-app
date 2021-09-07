import React from 'react';

import { useHomeData } from '../util/api';
import { Loading } from '../components/Loading';
import { ProductList } from '../components/List';

export const Home = () => {
  const { isLoading, data } = useHomeData();

  if (isLoading) {
    return <Loading />;
  }

  const sections = data?.data?.map(section => {
    return {
      ...section,
      data: section.items,
      items: undefined,
    };
  });

  return <ProductList sections={sections} />;
};
