import { Navbar } from '@/components/Navbar';
import { Tabs } from 'expo-router';
import { DollarSign, Plus, UsersRound } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <Navbar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ color }) => <DollarSign color={color} />,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="addFunds"
        options={{
          tabBarIcon: ({ color }) => <Plus color={color} />,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          tabBarIcon: ({ color }) => <UsersRound color={color} />,
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}
