import CodeInput from '@/components/CodeInput';
import RoundedButton from '@/components/RoundedButton';
import Subtitle from '@/components/Subtitle';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Code() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Informe o código recebido</Text>
        <Subtitle center>
          Caso não tenha recebido o código de confirmação via email, verifique a sua caixa de spam
        </Subtitle>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formFieldsContainer}>
          <CodeInput
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="oneTimeCode"
            inputMode="numeric"
          />
          <CodeInput
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="oneTimeCode"
            inputMode="numeric"
          />
          <CodeInput
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="oneTimeCode"
            inputMode="numeric"
          />
          <CodeInput
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="oneTimeCode"
            inputMode="numeric"
          />
        </View>

        <View style={styles.formButtonContainer}>
          <RoundedButton
            text="CONFIRMAR CÓDIGO"
            onPress={() => router.push('/forgot-password/reset-password')}
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
    justifyContent: 'space-around',
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleContainer: {
    gap: 8,
  },
});
