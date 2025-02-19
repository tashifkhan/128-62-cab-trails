import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme, Platform } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#8AB8E8' : '#002884',
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#ffffff',
          borderTopWidth: 0,
          paddingTop: 6,
          height: Platform.OS === 'ios' ? 80 : 60,
        },
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#9ca3af' : '#6b7280',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Find Ride',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create Ride',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="car" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
