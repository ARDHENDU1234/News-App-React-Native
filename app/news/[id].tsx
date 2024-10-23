import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Corrected vector icons import
import { NewsDataType } from '@types'; // Correct path
import axios from 'axios';
import Loading from '@components/Loading'; // Correct path
import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Fixed AsyncStorage import path
import { Colors } from 'react-native/Libraries/NewAppScreen'; // Correct path

type Props = {};

const NewsDetails: React.FC<Props> = (props) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookmark, setBookmark] = useState(false);

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    if (!isLoading && news.length > 0) {
      renderBookmark(news[0].article_id);
    }
  }, [isLoading, news]);

  const getNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`;
      const response = await axios.get(URL);

      if (response && response.data) {
        setNews(response.data.results);
      }
    } catch (err: any) {
      console.error('Error fetching news ', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const saveBookmark = async (newsId: string) => {
    setBookmark(true);
    const storedBookmarks = await AsyncStorage.getItem('bookmark');
    const bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];

    if (!bookmarks.includes(newsId)) {
      bookmarks.push(newsId);
      await AsyncStorage.setItem('bookmark', JSON.stringify(bookmarks));
      alert('News Saved!');
    }
  };

  const removeBookmark = async (newsId: string) => {
    setBookmark(false);
    const storedBookmarks = await AsyncStorage.getItem('bookmark');
    const bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];

    const updatedBookmarks = bookmarks.filter((id: string) => id !== newsId);
    await AsyncStorage.setItem('bookmark', JSON.stringify(updatedBookmarks));
    alert('News Unsaved');
  };

  const renderBookmark = async (newsId: string) => {
    const storedBookmarks = await AsyncStorage.getItem('bookmark');
    const bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];

    const isBookmarked = bookmarks.includes(newsId);
    setBookmark(isBookmarked);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                bookmark
                  ? removeBookmark(news[0].article_id)
                  : saveBookmark(news[0].article_id)
              }
            >
              <Ionicons
                name={bookmark ? 'heart' : 'heart-outline'}
                size={22}
                color={bookmark ? 'red' : Colors.black}
              />
            </TouchableOpacity>
          ),
          title: '',
        }}
      />

      {isLoading ? (
        <Loading size="large" />
      ) : (
        <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
          {news.length > 0 && (
            <>
              <Text style={styles.title}>{news[0].title}</Text>
              <View style={styles.newsInfoWrapper}>
                <Text style={styles.newsInfo}>
                  {Moment(news[0].pubDate).format('MMMM DD, hh:mm a')}
                </Text>
                <Text style={styles.newsInfo}>{news[0].source_name}</Text>
              </View>
              <Image source={{ uri: news[0].image_url }} style={styles.newsImg} />
              <Text style={styles.newsContent}>
                {news[0].content || news[0].description}
              </Text>
            </>
          )}
        </ScrollView>
      )}
    </>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  newsImg: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  newsInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  newsInfo: {
    fontSize: 12,
    color: Colors.darkGray,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginVertical: 10,
    letterSpacing: 0.6,
  },
  newsContent: {
    fontSize: 14,
    color: '#555',
    letterSpacing: 0.8,
    lineHeight: 22,
  },
});
