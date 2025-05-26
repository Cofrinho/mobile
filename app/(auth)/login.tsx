import RoundedButton from '@/components/RoundedButton';
import RoundedInput from '@/components/RoundedInput';
import Subtitle from '@/components/Subtitle';
import Colors from '@/constants/colors';
import { StyleSheet, Text, View } from 'react-native';

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Entre na sua Conta</Text>
        <Subtitle>Começe a dividir suas despesas</Subtitle>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formFieldsContainer}>
          <RoundedInput placeholder="Email" />
          <RoundedInput placeholder="Senha" isPassword />
        </View>

        <View style={styles.formButtonContainer}>
          <RoundedButton text="LOGIN" />
          <Text style={styles.text}>Esqueceu sua senha?</Text>
        </View>
      </View>

      <View style={styles.registerContainer}>
        <Subtitle>Não possui uma conta?</Subtitle>
        <Text style={styles.text}>Registrar</Text>
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
