import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExpenseLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
    </SafeAreaView>
  );
}
