import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

type Props = {}

const Page = (props: Props) => {
  const { query, category, country } = useLocalSearchParams<{
    query: string;
    category: string; 
    country: string;
  }>();

    const [news, setNews] = useState<NewsDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);  

    const getNews = async (category: string = '') => {
        try {
            let categoryString = '';
            let countryString = '';
            let queryString = '';
            if (category) {
                categoryString = `&category=${category}`;
            }
            if (country) {
                countryString = `&country=${category}`;
            }      
            if (country) {
                countryString = `&country=${category}`;
            }                

            const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=10${categoryString}`;
            const response = await axios.get(URL);

            if (response && response.data) {
            setNews(response.data.results); // Corrected from setBreakingNews to setNews
            setIsLoading(false);
            }
        } catch (err: any) {
            console.log('Error Message: ', err.message);
        }
    };

  return (
    <View>
      <Text>Search Query: {query}</Text>
      <Text>Category: {category}</Text>
      <Text>Country: {country}</Text>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})