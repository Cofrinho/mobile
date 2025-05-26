import { Redirect } from 'expo-router';
import { useState } from 'react';

export default function Page() {
  // fake auth state to control auth screens render
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return isAuthenticated ? (
    <Redirect href={'/(tabs)/account'} />
  ) : (
    <Redirect href={'/(auth)/login'} />
  );
}
