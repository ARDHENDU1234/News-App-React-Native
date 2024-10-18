import { Animated, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../constants/Colors'; // Adjusted path
import { FlatList } from 'react-native-gesture-handler';
import { NewsDataType } from '@/types'; // Adjusted path
import SliderItem from '@/components/SliderItem'; // Adjusted path
import { useAnimatedRef, useSharedValue } from 'react-native-reanimated';
import { useAnimatedScrollHandler } from 'react-native-reanimated';

type Props = {
    newsList: Array<NewsDataType>
}

const BreakingNews = ({ newsList }: Props) => {
    const [data, setData] = useState(newsList);
    const [paginationIndex, setPaginationIndex] = useState(0);
    const scrollX = useSharedValue(0);
    const ref = useAnimatedRef<Animated.FlatList<any>>();

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        },
    });    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Breaking News</Text>
            <View style={styles.slideWrapper}>
                <Animated.FlatList
                    ref={ref}
                    data={data}
                    keyExtractor={(_, index) => `list_item${index}`} 
                    renderItem={({ item, index }) => (
                        <SliderItem slideItem={item} index={index} scrollX={scrollX}/> 
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScroll={onScrollHandler}
                    scrollEventThrottle={16}
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
        // width: '100%',
        // flex: 1,
        justifyContent: 'center'
    }
});
function useState(newsList: NewsDataType[]): [any, any] {
    throw new Error('Function not implemented.');
}

