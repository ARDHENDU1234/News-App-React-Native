import { StyleSheet, View } from 'react-native';
import React from 'react';
import { NewsDataType } from '@/types';
import Animated, { SharedValue } from 'react-native-reanimated';
import { Colors } from '../constants/Colors'; // Adjust the path if necessary

type Props = {
  items: NewsDataType[];
  paginationIndex: number;
  scrollX: SharedValue<number>;
};

const Pagination = ({ items, paginationIndex, scrollX }: Props) => {
  return (
    <View style={styles.container}>
      {items.map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            { backgroundColor: paginationIndex === index ? Colors.tint : Colors.darkGrey },
          ]}
        />
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    width: 8,
    marginHorizontal: 2,
    borderRadius: 8,
  },
});
