import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccountLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
