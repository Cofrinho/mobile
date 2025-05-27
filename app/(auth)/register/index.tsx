import RoundedButton from '@/components/RoundedButton';
import RoundedInput from '@/components/RoundedInput';
import Stepper from '@/components/Stepper';
import Subtitle from '@/components/Subtitle';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Register() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Crie uma Conta</Text>
        <Subtitle>Começe a fortalecer o cofrinho do seu grupo</Subtitle>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formFieldsContainer}>
          {step == 1 && (
            <View style={styles.formFieldsContainer}>
              <Text style={{ color: Colors.black, fontWeight: 'bold', marginLeft: 4 }}>
                Dados Pessoais
              </Text>
              <RoundedInput placeholder="Nome completo" />
              <RoundedInput placeholder="Cpf" />
              {/* TODO: CRIAR INPUT DE DATA */}
              <RoundedInput placeholder="Data de Nascimento" />
            </View>
          )}

          {step == 2 && (
            <View style={styles.formFieldsContainer}>
              <View style={styles.formFieldsContainer}>
                <Text style={{ color: Colors.black, fontWeight: 'bold', marginLeft: 4 }}>
                  Dados de Contato
                </Text>
                <RoundedInput placeholder="Email" />
                {/* TODO: CRIAR INPUT DE CELULAR */}
                <RoundedInput placeholder="Celular" />
              </View>
            </View>
          )}

          {step == 3 && (
            <View style={styles.formFieldsContainer}>
              <View style={styles.formFieldsContainer}>
                <Text style={{ color: Colors.black, fontWeight: 'bold', marginLeft: 4 }}>
                  Defina uma senha
                </Text>
                <RoundedInput placeholder="Senha" isPassword />
                {/* TODO: CRIAR INPUT DE CELULAR */}
                <RoundedInput placeholder="Confirme sua senha" isPassword />
              </View>
            </View>
          )}
        </View>

        <View style={styles.formButtonContainer}>
          <RoundedButton
            text={step == 3 ? 'CRIAR CONTA' : 'AVANÇAR'}
            onPress={() => (step == 3 ? router.push('/register/successfull') : setStep(step + 1))}
          />
        </View>

        <View style={styles.formStepsContainer}>
          <Stepper onPress={() => setStep(1)} active={step == 1} />
          <Stepper onPress={() => setStep(2)} active={step == 2} />
          <Stepper onPress={() => setStep(3)} active={step == 3} />
        </View>
      </View>

      <View style={styles.registerContainer}>
        <Subtitle>Já possui uma conta?</Subtitle>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.text}>Entrar</Text>
        </TouchableOpacity>
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
  formStepsContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: '4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formFieldsContainer: {
    width: '100%',
    gap: 12,
  },
  titleContainer: {
    gap: 8,
  },
  formButtonContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: '12',
    alignItems: 'center',
  },
});
