import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import newsCategoryList from '@/constants/Categories';

type Props = {
    onCategoryChanged: (category: string) => void;  
};

const Categories = ({ onCategoryChanged }: Props) => {
    const scrollRef = useRef<ScrollView>(null);
    const itemRefs = useRef<(TouchableOpacity | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleSelectCategory = (index: number) => {
        setActiveIndex(index);

        itemRefs.current[index]?.measure((x) => {
            scrollRef.current?.scrollTo({ x: x - 20, y: 0, animated: true });
        });

        onCategoryChanged(newsCategoryList[index].slug);
    };

    return (
        <View>
            <Text style={styles.title}>Trending Right Now</Text>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.itemsWrapper} 
                ref={scrollRef}
            >
                {newsCategoryList.map((item, index) => (
                    <TouchableOpacity 
                        ref={(el) => (itemRefs.current[index] = el)} 
                        key={item.slug} // Use slug as key for better performance
                        style={[styles.item, activeIndex === index && styles.itemActive]}
                        onPress={() => handleSelectCategory(index)}
                    >
                        <Text 
                            style={[styles.itemText, activeIndex === index && styles.itemTextActive]}
                        >
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default Categories;

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: Colors.black,
        marginBottom: 10,
        marginLeft: 20,
    },
    itemsWrapper: {
        gap: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    item: {
        borderWidth: 1,
        borderColor: Colors.darkGrey,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    itemActive: {
        backgroundColor: Colors.tint,
        borderColor: Colors.tint,
    },
    itemText: {
        fontSize: 14,
        color: Colors.darkGrey,
        letterSpacing: 0.5,
    },
    itemTextActive: {
        fontWeight: '600',
        color: Colors.white,
    },
});
