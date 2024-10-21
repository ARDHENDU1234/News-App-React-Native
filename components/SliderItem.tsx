import { Dimensions, StyleSheet, View, Image, Text } from 'react-native';
import React from 'react';
import { NewsDataType } from '@/types';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Link } from 'expo-router';

type Props = {
    slideItem: NewsDataType;
    index: number;
    scrollX: SharedValue<number>;
};

const { width } = Dimensions.get('screen');

const SliderItem = ({ slideItem, index, scrollX }: Props) => {
    // Create the animated style for transforming the slider item
    const rnStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width], // For previous, current, and next items
                        [-width * 0.15, 0, width * 0.15], // The interpolation values for translateX
                        Extrapolation.CLAMP // Ensure it stays within bounds
                    ),
                },
                {
                    scale: interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width], // For scaling effect on previous, current, and next items
                        [0.9, 1, 0.9], // Scale down for non-active items and full scale for the active one
                        Extrapolation.CLAMP // Keep it constrained
                    ),
                },
            ],
        };
    });

    return (
        <Link href={`/news/${slideItem.article_id}`} asChild>
            <TouchableOpacity>
                <Animated.View style={[styles.itemWrapper, rnStyle]} key={slideItem.article_id}>
                    <Image source={{ uri: slideItem.image_url }} style={styles.image} />
                    <LinearGradient colors={["transparent", 'rgba(0, 0, 0, 0.8)']} style={styles.background}>
                        <View style={styles.sourceInfo}>
                            {slideItem.source_icon && (
                                <Image source={{ uri: slideItem.source_icon }} style={styles.sourceIcon} />
                            )}
                            <Text style={styles.sourceName}>{slideItem.source_name}</Text>
                        </View>
                        <Text style={styles.title} numberOfLines={2}>
                            {slideItem.title}
                        </Text>
                    </LinearGradient>
                </Animated.View>
            </TouchableOpacity>
        </Link>
    );
};

export default SliderItem;

const styles = StyleSheet.create({
    itemWrapper: {
        position: 'relative',
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: width - 60,
        height: 180,
        borderRadius: 20,
    },
    background: {
        position: 'absolute',
        left: 30,
        right: 0,
        top: 0,
        width: width - 60,
        height: 180,
        borderRadius: 20,
        padding: 20,
    },
    sourceInfo: {
        flexDirection: 'row',
        position: 'absolute',
        top: 85,
        paddingHorizontal: 20,
        alignItems: 'center',
        gap: 10,
    },
    sourceName: {
        color: '#FFFFFF', // Ensure you have the Colors.white value or replace it with the hex code
        fontSize: 12,
        fontWeight: '600',
    },
    sourceIcon: {
        width: 25,
        height: 25,
        borderRadius: 20,
    },
    title: {
        fontSize: 14,
        color: '#FFFFFF', // Ensure you have the Colors.white value or replace it with the hex code
        position: 'absolute',
        top: 120,
        paddingHorizontal: 20,
        fontWeight: '600',
    },
});
