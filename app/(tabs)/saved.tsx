import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storageasync-storage';
import { Link, Stack } from 'expo-router';
import Loading from '@componentsLoading';
import { NewsItem } from '@componentsNewsList';
import axios from 'axios';
import { useIsFocused } from '@react-navigationnative';

type Props = {};

const BookmarkPage = (props Props) = {
  const [bookmarkNews, setBookmarkNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() = {
    if (isFocused) {
      fetchBookmarks();
    }
  }, [isFocused]);

  const fetchBookmarks = async () = {
    try {
      const storedBookmarks = await AsyncStorage.getItem('bookmark');
      const res = storedBookmarks  JSON.parse(storedBookmarks)  [];

      setIsLoading(true);
      if (res.length  0) {
        const queryString = res.join(',');
        const response = await axios.get(
          httpsnewsdata.ioapi1newsapikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${queryString}
        );

        if (response && response.data) {
          setBookmarkNews(response.data.results);
        } else {
          setBookmarkNews([]);
        }
      } else {
        setBookmarkNews([]);
      }
    } catch (err) {
      console.log('Error fetching bookmarks ', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
      Stack.Screen
        options={{
          headerShown true,
        }}
      
      View style={styles.container}
        {isLoading  (
          Loading size=large 
        )  (
          FlatList
            data={bookmarkNews}
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

export default BookmarkPage;

const styles = StyleSheet.create({
  container {
    flex 1,
    margin 20,
  },
});