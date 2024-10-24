import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import SearchBar from '@componentsSearchBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@constantsColors';
import CheckBox from '@componentsCheckBox';
import { useNewsCategories } from '@hooksuseNewsCategories';
import { useNewsCountries } from '@hooksuseNewsCountries';
import { Link } from '@react-navigationnative';

type Props = {}

const Page = (props Props) = {
  const { top safeTop } = useSafeAreaInsets();

  const { newsCategories, toggleNewsCategory } = useNewsCategories();
  const { newsCountries, toggleNewsCountry } = useNewsCountries();
  const [searchQuery, setSearchQuery] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedCountry, setSelectedCountry] = useState();

  return (
    View style={[styles.container, { paddingTop safeTop + 20 }]}
      SearchBar 
        withHorizontalPadding={false}
        setSearchQuery={setSearchQuery}
      
      
      Text style={styles.title}CategoriesText
      View style={styles.listContainer}
        {newsCategories.map((item) = (
          CheckBox 
            key={item.id}  Use item.id as the key
            label={item.title} 
            checked={item.selected} 
            onPress={() = {
              toggleNewsCategory(item.id);  Toggle based on item.id
              setSelectedCategory(item.slug);  Bind selected category by slug
            }} 
          
        ))}
      View

      Text style={styles.title}CountryText
      View style={styles.listContainer}
        {newsCountries.map((item, index) = ( 
          CheckBox 
            key={index}  Use index as the key
            label={item.name} 
            checked={item.selected} 
            onPress={() = {
              toggleNewsCountry(index);  Toggle based on index
              setSelectedCountry(item.code);  Bind selected country by code
            }} 
          
        ))}      
      View

      Link
        to={{
          pathname newssearch,
          params { query searchQuery, category, country },
        }} asChild
        TouchableOpacity style={styles.searchBtn}
          Text style={styles.searchBtnTxt}SearchText
        TouchableOpacity
      Link
    View
  )
}

export default Page;

const styles = StyleSheet.create({
  container {
    flex 1,
    paddingHorizontal 20,
  },
  title {
    fontSize 18,
    fontWeight 600,
    color Colors.black,
    marginBottom 10, 
  },
  listContainer { 
    flexDirection 'row',
    flexWrap 'wrap',
    gap 16,
    marginTop 12,
    marginBottom 20,
  },
  searchBtn {
    backgroundColor Colors.tint,
    alignItems 'center',
    padding 14,
    borderRadius 10,
    marginVertical 10,
  },
  searchBtnTxt {
    color Colors.white,
    fontSize 16,
    fontWeight '600'
  }
});