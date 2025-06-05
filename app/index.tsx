import { AuthContext } from '@/contexts/AuthContext';
import { Redirect } from 'expo-router';
import { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Page() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isAuthenticated ? (
    <Redirect href={'/(tabs)/account'} />
  ) : (
    <Redirect href={'/(auth)/login'} />
  );
}
