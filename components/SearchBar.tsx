import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
// Make sure the correct path for Colors is provided
import { Colors } from '../constants/Colors'; // Adjusted the path

type Props = {}

const SearchBar = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name='search-outline' size={20} color={Colors.lightGrey} />
        <TextInput 
          placeholder='Search' 
          placeholderTextColor={Colors.lightGrey} 
          style={styles.searchTxt}
          autoCapitalize="none"
        />
      </View>
    </View>
  )
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  searchBar: {
    backgroundColor: '#E4E4E4',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10
  },
  searchTxt: {
    fontSize: 14,
    flex: 1,
    color: Colors.darkGrey
  }
});
