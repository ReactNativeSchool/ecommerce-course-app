import React from 'react';

import { useExploreData } from '../util/api';
import { Loading } from '../components/Loading';
import { ProductList } from '../components/List';

export const Explore = () => {
  const { isLoading, data } = useExploreData();

  if (isLoading) {
    return <Loading />;
  }

  const sections = data?.categories?.map(category => {
    return {
      ...category,
      title: category.name,
      data: category.products,
      products: undefined,
    };
  });

  return <ProductList sections={sections} />;
};
