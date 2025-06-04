import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddFundsLayout() {
  return (
    <SafeAreaView
      style={{ paddingHorizontal: 24, flex: 1, paddingTop: 12, backgroundColor: '#fff' }}
    >
      <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
    </SafeAreaView>
  );
}
