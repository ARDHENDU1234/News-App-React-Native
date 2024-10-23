import { StyleSheet, Switch, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons'; // Corrected import statement
import { Colors } from '@/constants/Colors'; // Adjusted the path format

type Props = {};

const Page = (props: Props) => { // Fixed arrow function syntax and type annotation
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState); // Fixed the previousState typo

  return (
    <Stack.Screen
      options={{
        headerShown: true // Added colon
      }}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnTxt}>About</Text> {/* Fixed text and added closing tag */}
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color={Colors.lightGrey}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnTxt}>Send Feedback</Text> {/* Fixed text and added closing tag */}
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color={Colors.lightGrey}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnTxt}>Privacy Policy</Text> {/* Fixed text and added closing tag */}
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color={Colors.lightGrey}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnTxt}>Terms of Use</Text> {/* Fixed text and added closing tag */}
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color={Colors.lightGrey}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemBtn} onPress={toggleSwitch}>
          <Text style={styles.itemBtnTxt}>Dark Mode</Text> {/* Fixed text and added closing tag */}
          <Switch
            trackColor={{ false: '#767577', true: '#3e3e3e' }} // Added colons
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'} // Fixed ternary operator syntax
            ios_backgroundColor="#3e3e3e" // Added quotes
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ transform: [{ scale: 0.6 }], marginBottom: -15, marginRight: -8 }} // Fixed style syntax
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemBtn}>
          <Text style={[styles.itemBtnTxt, { color: 'red' }]}>Logout</Text> {/* Fixed text and added closing tag */}
          <MaterialIcons
            name="logout"
            size={16}
            color={'red'}
          />
        </TouchableOpacity>
      </View>
    </Stack.Screen>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: { // Added colon
    flex: 1, // Added colon
    padding: 20 // Added colon
  },
  itemBtn: {
    flexDirection: 'row', // Added colon
    justifyContent: 'space-between', // Added colon
    backgroundColor: Colors.white, // Added colon
    paddingHorizontal: 16, // Added colon
    paddingVertical: 20, // Added colon
    borderBottomColor: Colors.background, // Added colon
    borderBottomWidth: 1, // Added colon
  },
  itemBtnTxt: {
    fontSize: 14, // Added colon
    fontWeight: '500', // Added colon
    color: Colors.black, // Added colon
  }
});
