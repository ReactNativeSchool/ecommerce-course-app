import React from 'react';
import { View, SectionList, StyleSheet } from 'react-native';

import { useHomeData } from '../util/api';
import { Loading } from '../components/Loading';
import { ItemCard, SectionHeader, SectionFooter } from '../components/List';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  sectionList: {
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 100,
  },
});

export const Home = ({ navigation }) => {
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

  return (
    <SectionList
      style={styles.sectionList}
      contentContainerStyle={styles.content}
      sections={sections}
      renderItem={({ item }) => {
        return (
          <View style={{ backgroundColor: '#fff' }}>
            <ItemCard {...item} onPress={() => navigation.push('Details')} />
          </View>
        );
      }}
      renderSectionHeader={({ section }) => (
        <SectionHeader>{section.title}</SectionHeader>
      )}
      renderSectionFooter={() => <SectionFooter />}
      stickySectionHeadersEnabled={false}
    />
  );
};
