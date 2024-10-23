import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { Colors } from "@/constants/Colors"; // Ensure this path is correct

type Props = {};

const Header = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        {/* Display user image */}
        <Image 
          source={{ uri: 'https://xsgames.co/randomusers/avatar.php?g=male' }} 
          style={styles.userImg} 
        />
        <View style={styles.textContainer}>
          <Text style={styles.welcomeTxt}>Welcome</Text>
          <Text style={styles.userName}>John Doe!</Text>
        </View>
      </View>

      {/* Notification button with TouchableOpacity */}
      <TouchableOpacity onPress={() => {}}>
        <Ionicons name='notifications-outline' size={24} color={Colors.black} />
      </TouchableOpacity>      
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userImg: {
    height: 50,
    width: 50, // Added width to maintain aspect ratio
    borderRadius: 25, // Changed to half of width for a perfect circle
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textContainer: {
    gap: 3,
  },
  welcomeTxt: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.black,
  },
});
