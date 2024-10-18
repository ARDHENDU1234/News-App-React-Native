import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../constants/Colors'; // Adjusted path
import { FlatList } from 'react-native-gesture-handler';
import { NewsDataType } from '../types'; // Adjusted path
import SliderItem from '../components/SliderItem'; // Adjusted path

type Props = {
    newsList: Array<NewsDataType>
}

const BreakingNews = ({ newsList }: Props) => {
    // Log the newsList to check its structure and ensure it has data
    console.log('News List:', newsList); 

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Breaking News</Text>
            <View style={styles.slideWrapper}>
                <FlatList
                    data={newsList}
                    keyExtractor={(_, index) => `list_item${index}`} // Unique key for each item
                    renderItem={({ item }) => (
                        <SliderItem /> 
                    )}
                />
            </View>
        </View>
    );
}

export default BreakingNews;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: Colors.black,
        marginBottom: 10,
        marginLeft: 20,
    },
    slideWrapper: {
        width: '100%',
        flex: 1,
        justifyContent: 'center'
    },
    emptyList: {
        alignItems: 'center', // Center content when empty
        justifyContent: 'center', // Center vertically
    },
});
