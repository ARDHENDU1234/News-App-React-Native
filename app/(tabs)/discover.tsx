import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import CheckBox from '@/components/CheckBox';
import { useNewsCategories } from '@/hooks/useNewsCategories';
import { useNewsCountries } from '@/hooks/useNewsCountries';
import { Link } from '@react-navigation/native';

type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();

  const { newsCategories, toggleNewsCategory } = useNewsCategories();
  const { newsCountries, toggleNewsCountry } = useNewsCountries();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  return (
    <View style={[styles.container, { paddingTop: safeTop + 20 }]}>
      <SearchBar 
        withHorizontalPadding={false}
        setSearchQuery={setSearchQuery}
      />
      
      <Text style={styles.title}>Categories</Text>
      <View style={styles.listContainer}>
        {newsCategories.map((item) => (
          <CheckBox 
            key={item.id} 
            label={item.title} 
            checked={item.selected} 
            onPress={() => {
              toggleNewsCategory(item.id); 
              setSelectedCategory(item.slug);
            }} 
          />
        ))}
      </View>

      <Text style={styles.title}>Country</Text>
      <View style={styles.listContainer}>
        {newsCountries.map((item) => ( 
          <CheckBox 
            key={item.code} 
            label={item.name} 
            checked={item.selected} 
            onPress={() => {
              toggleNewsCountry(item.code); 
              setSelectedCountry(item.code); 
            }} 
          />
        ))}      
      </View>

      <Link
        to={{
          pathname: '/news/search',
          params: { query: searchQuery, category: selectedCategory, country: selectedCountry },
        }} asChild>
        <TouchableOpacity style={styles.searchBtn}>
          <Text style={styles.searchBtnTxt}>Search</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 10, 
  },
  listContainer: { 
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 12,
    marginBottom: 20,
  },
  searchBtn: {
    backgroundColor: Colors.tint,
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
  },
  searchBtnTxt: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
