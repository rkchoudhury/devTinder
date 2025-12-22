import { Tabs, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <IconButton
            icon="account-circle"
            size={28}
            onPress={() => router.push('/profile')}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: 'My Feed',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cards" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="connection"
        options={{
          title: 'My Connections',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="connectionRequest"
        options={{
          title: 'Connection Requests',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-clock" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
