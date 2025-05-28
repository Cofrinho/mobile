import LogoWithTitle from '@/components/LogoWithTitle';
import Colors from '@/constants/colors';
import { Slot, usePathname, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AuthLayout() {
  const router = useRouter();
  const pathname = usePathname();

  const hiddenBackButtonRoutes = [
    '/login',
    '/register/successfull',
    '/forgot-password/successfull',
  ];

  const shouldShowBackButton = !hiddenBackButtonRoutes.includes(pathname);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {shouldShowBackButton && (
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ position: 'absolute', left: 24, top: -64 }}
          >
            <ChevronLeft size={24} color={Colors.primary} />
          </TouchableOpacity>
        )}
        <LogoWithTitle />
      </View>

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Slot />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    marginTop: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
