import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, router, Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expovector-icons';
import Loading from '@componentsLoading';
import { NewsItem } from '@componentsNewsList';
import axios from 'axios';

type NewsDataType = {
  article_id string;
  title string;
  description string;
   other fields as per the news data structure
};

const Page = () = {
  const { query = '', category = '', country = '' } = useLocalSearchParams{
    query string;
    category string; 
    country string;
  }();

  const [news, setNews] = useStateNewsDataType[]([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() = {
    getNews();
  }, []);

  const getNews = async () = {
    try {
      let categoryString = category  &category=${category}  '';
      let countryString = country  &country=${country}  '';
      let queryString = query  &query=${query}  '';

      const URL = httpsnewsdata.ioapi1newsapikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=10${categoryString}${countryString}${queryString};
      const response = await axios.get(URL);

      if (response && response.data) {
        setNews(response.data.results);
      }
    } catch (err any) {
      console.log('Error Message ', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
      Stack.Screen
        options={{
          headerLeft () = (
            TouchableOpacity onPress={() = router.back()}
              Ionicons name=arrow-back size={24} 
            TouchableOpacity
          ),
          title Search,
        }}
      
      View style={styles.container}
        {isLoading  (
          Loading size=large 
        )  (
          FlatList
            data={news}
            keyExtractor={(_, index) = list_item${index}}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) = (
              Link href={news${item.article_id}} asChild
                TouchableOpacity
                  NewsItem item={item} 
                TouchableOpacity
              Link
            )}
          
        )}
      View
    
  );
};

export default Page;

const styles = StyleSheet.create({
  container {
    flex 1,
    marginHorizontal 20,
    marginVertical 20,
  },
});
