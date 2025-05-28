import RoundedButton from '@/components/RoundedButton';
import RoundedInput from '@/components/RoundedInput';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function ResetPassword() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Redefinir senha</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formFieldsContainer}>
          <View style={styles.formFieldsContainer}>
            <RoundedInput
              placeholder="Senha"
              isPassword
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={true}
              textContentType="password"
              autoComplete="password"
              inputMode="text"
            />

            <RoundedInput
              placeholder="Confirme sua senha"
              isPassword
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={true}
              textContentType="password"
              autoComplete="password"
              inputMode="text"
            />
          </View>
        </View>

        <View style={styles.formButtonContainer}>
          <RoundedButton
            text="REDEFINIR SENHA"
            onPress={() => router.push('/forgot-password/successfull')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 104,
  },
  text: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
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
    flex: 1,
    justifyContent: 'space-evenly',
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
    display: 'flex',
    justifyContent: 'center',
  },
  titleContainer: {
    gap: 8,
  },
});
