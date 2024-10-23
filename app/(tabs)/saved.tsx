import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, Stack } from 'expo-router';
import Loading from '../components/Loading'; // Updated to relative path
import { NewsItem } from '../components/NewsList'; // Updated to relative path
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

type Props = {};

const BookmarkPage = (props: Props) => {
  const [bookmarkNews, setBookmarkNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchBookmarks();
  }, [isFocused]);

  const fetchBookmarks = async () => {
    await AsyncStorage.getItem('bookmark').then(async (token) => {
      const res = JSON.parse(token);
      setIsLoading(true);
      if (res) {
        console.log('Bookmark res: ', res);
        let queryString = res.join(',');
        console.log('Query string: ', queryString);

        const response = await axios.get(`https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${queryString}`);
        setBookmarkNews(response.data.results);
      } else {
        setBookmarkNews([]);
      }
      setIsLoading(false);
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
        }}
      />
      <View style={styles.container}>
        {isLoading ? (
          <Loading size="large" />
        ) : (
          <FlatList
            data={bookmarkNews}
            keyExtractor={(_, index) => `list_item${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Link href={`/news/${item.article_id}`} asChild>
                <TouchableOpacity>
                  <NewsItem item={item} />
                </TouchableOpacity>
              </Link>
            )}
          />
        )}
      </View>
    </>
  );
};

export default BookmarkPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});
