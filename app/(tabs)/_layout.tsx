import React from 'react';
import { Tabs } from 'expo-router';
import { TabBar } from '@/components/TabBar'; // Ensure this path is correct

const TabLayout = () => { // Corrected arrow function syntax
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index" // Added quotes around the name
        options={{
          title: "Home", // Added quotes around the title
        }}
      />
      <Tabs.Screen
        name="discover" // Added quotes around the name
        options={{
          title: "Discover", // Added quotes around the title
        }}
      />
      <Tabs.Screen
        name="saved" // Added quotes around the name
        options={{
          title: "Saved", // Added quotes around the title
        }}
      />
      <Tabs.Screen
        name="settings" // Added quotes around the name
        options={{
          title: "Settings", // Added quotes around the title
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
