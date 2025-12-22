import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cards" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="connection"
        options={{
          title: 'Connections',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="connectionRequest"
        options={{
          title: 'Requests',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-clock" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
