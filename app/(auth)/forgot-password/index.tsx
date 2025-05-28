import RoundedButton from '@/components/RoundedButton';
import RoundedInput from '@/components/RoundedInput';
import Subtitle from '@/components/Subtitle';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function ForgotPassword() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Esqueceu sua senha?</Text>
        <Subtitle center>Sem problemas! Siga as instruções para redefinir sua senha</Subtitle>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formFieldsContainer}>
          <RoundedInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
            autoComplete="email"
            inputMode="email"
          />
        </View>

        <View style={styles.formButtonContainer}>
          <RoundedButton
            text="ENVIAR CÓDIGO"
            onPress={() => router.push('/forgot-password/code')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 104,
    gap: 72,
  },
  text: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  formButtonContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: '12',
    alignItems: 'center',
  },
  formFieldsContainer: {
    width: '100%',
    gap: 12,
  },
  titleContainer: {
    gap: 8,
  },
});
