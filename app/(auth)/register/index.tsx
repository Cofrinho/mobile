import RoundedButton from '@/components/RoundedButton';
import RoundedInput from '@/components/RoundedInput';
import Stepper from '@/components/Stepper';
import Subtitle from '@/components/Subtitle';
import Colors from '@/constants/colors';
import { AuthContext } from '@/contexts/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

interface RegisterFormData {
  name: string;
  cpf: string;
  birth_date: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

function isValidCPF(cpf: string): boolean {
  if (!cpf || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  let rest;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf[i - 1]) * (11 - i);
  }

  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf[9])) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf[i - 1]) * (12 - i);
  }

  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;

  return rest === parseInt(cpf[10]);
}

const step1Schema = z.object({
  name: z
    .string()
    .min(2, 'Nome é obrigatório')
    .regex(/^[a-zA-Z\s]+$/, 'Insira um nome válido'),
  cpf: z
    .string()
    .min(11, 'CPF deve ter 11 dígitos. Ex: 00000000000')
    .max(11, 'CPF deve ter 11 dígitos. Ex: 00000000000')
    .regex(/^\d{11}$/, 'CPF deve conter apenas números')
    .refine((cpf) => isValidCPF(cpf), {
      message: 'CPF inválido',
    }),
  birth_date: z.string().min(1, 'Data de Nascimento é obrigatória'),
});

const step2Schema = z.object({
  email: z.string().email('Email inválido'),
  phone: z.string().min(1, 'Celular é obrigatório'),
});

const step3Schema = z
  .object({
    password: z
      .string()
      .min(8, 'Senha deve ter no mínimo 8 caracteres.')
      .max(64, 'Senha deve ter no máximo 64 caracteres.')
      .refine((val) => /[A-Z]/.test(val), {
        message: 'Senha deve ter uma letra maiúscula.',
      })
      .refine((val) => /[0-9]/.test(val), {
        message: 'Senha deve ter um número.',
      })
      .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
        message: 'Senha deve ter um caracter especial.',
      }),
    confirmPassword: z.string().min(8, 'Confirmação de senha deve ter no mínimo 8 caracteres.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

const stepSchemas = {
  1: step1Schema,
  2: step2Schema,
  3: step3Schema,
};

export default function Register() {
  const [step, setStep] = useState(1);
  const {
    control,
    trigger,
    handleSubmit,
    getValues,
    formState: { errors },
    clearErrors,
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: '',
      cpf: '',
      birth_date: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(stepSchemas[step]),
  });
  const { register, loading } = useContext(AuthContext);
  const [responseError, setResponseError] = useState('' as string);

  const onSubmit = async (data: any) => {
    try {
      console.log('Register data:', data);
      await register(data);
      setResponseError('');
      router.push('/(auth)/register/successfull');
    } catch (error: any) {
      console.error('Error during registration:', error);
      const apiMessage =
        error?.response?.data?.error ?? error?.message ?? 'Erro inesperado. Tente novamente.';
      setResponseError(apiMessage);
    }
  };

  const handleNextStep = async () => {
    const isStepValid = await trigger();
    if (isStepValid && step < 3) {
      setStep((prev) => prev + 1);
    }
    if (step === 3) {
      const formData = getValues();
      const isValid = await trigger();
      if (!isValid) return;
      const user = {
        name: formData.name,
        cpf: formData.cpf,
        birth_date: formData.birth_date,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };
      await onSubmit(user);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        clearErrors();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors, clearErrors]);

  useEffect(() => {
    if (responseError !== '') {
      const timer = setTimeout(() => {
        setResponseError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [responseError, setResponseError]);

  return (
    <SafeAreaView style={styles.container}>
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
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <RoundedInput
                    placeholder="Nome Completo"
                    onChangeText={onChange}
                    value={value}
                    keyboardType="default"
                    autoCapitalize="words"
                    autoCorrect={false}
                    textContentType="name"
                    autoComplete="name"
                    inputMode="text"
                  />
                )}
              />
              {errors.name && (
                <Text style={{ color: 'red', marginLeft: 8 }}>{errors.name.message}</Text>
              )}

              <Controller
                control={control}
                name="cpf"
                render={({ field: { onChange, value } }) => (
                  <MaskedTextInput
                    mask="999.999.999-99"
                    placeholder="CPF"
                    keyboardType="numeric"
                    onChangeText={(text, rawText) => onChange(rawText)}
                    value={value}
                    style={styles.input}
                    placeholderTextColor="#aaa"
                  />
                )}
              />
              {errors.cpf && (
                <Text style={{ color: 'red', marginLeft: 8 }}>{errors.cpf.message}</Text>
              )}

              <Controller
                control={control}
                name="birth_date"
                render={({ field: { onChange, value } }) => {
                  const [show, setShow] = useState(false);

                  const handleChange = (event: any, selectedDate?: Date) => {
                    setShow(false);
                    if (selectedDate) {
                      onChange(selectedDate.toISOString());
                    }
                  };

                  return (
                    <View style={styles.dateContainer}>
                      <Pressable onPress={() => setShow(true)} style={styles.input}>
                        <Text
                          style={{
                            color: value ? '#000' : Colors.lightGray,
                            fontSize: 16,
                            fontWeight: '500',
                          }}
                        >
                          {value
                            ? new Date(value).toLocaleDateString('pt-BR')
                            : 'Data de Nascimento'}
                        </Text>
                      </Pressable>

                      {show && (
                        <DateTimePicker
                          value={value ? new Date(value) : new Date()}
                          mode="date"
                          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                          onChange={handleChange}
                          maximumDate={(() => {
                            const today = new Date();
                            today.setFullYear(today.getFullYear() - 18);
                            return today;
                          })()}
                        />
                      )}
                    </View>
                  );
                }}
              />
              {errors.birth_date && (
                <Text style={{ color: 'red', marginLeft: 8 }}>{errors.birth_date.message}</Text>
              )}
            </View>
          )}

          {step == 2 && (
            <View style={styles.formFieldsContainer}>
              <View style={styles.formFieldsContainer}>
                <Text style={{ color: Colors.black, fontWeight: 'bold', marginLeft: 4 }}>
                  Dados de Contato
                </Text>

                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                    <RoundedInput
                      placeholder="Email"
                      onChangeText={onChange}
                      value={value}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      textContentType="emailAddress"
                      autoComplete="email"
                      inputMode="email"
                    />
                  )}
                />
                {errors.email && (
                  <Text style={{ color: 'red', marginLeft: 8 }}>{errors.email.message}</Text>
                )}

                <Controller
                  control={control}
                  name="phone"
                  render={({ field: { onChange, value } }) => (
                    <MaskedTextInput
                      mask="(99) 99999-9999"
                      placeholder="Celular"
                      keyboardType="phone-pad"
                      onChangeText={(text, rawText) => onChange(rawText)}
                      value={value}
                      style={styles.input}
                      placeholderTextColor="#aaa"
                    />
                  )}
                />
                {errors.phone && (
                  <Text style={{ color: 'red', marginLeft: 8 }}>{errors.phone.message}</Text>
                )}
              </View>
            </View>
          )}

          {step == 3 && (
            <View style={styles.formFieldsContainer}>
              <View style={styles.formFieldsContainer}>
                <Text style={{ color: Colors.black, fontWeight: 'bold', marginLeft: 4 }}>
                  Defina uma senha
                </Text>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <RoundedInput
                      placeholder="Senha"
                      onChangeText={onChange}
                      value={value}
                      isPassword
                      keyboardType="default"
                      autoCapitalize="none"
                      autoCorrect={true}
                      textContentType="password"
                      autoComplete="password"
                      inputMode="text"
                    />
                  )}
                />
                {errors.password && (
                  <Text style={{ color: 'red', marginLeft: 8 }}>{errors.password.message}</Text>
                )}

                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, value } }) => (
                    <RoundedInput
                      placeholder="Confirme sua senha"
                      onChangeText={onChange}
                      value={value}
                      isPassword
                      keyboardType="default"
                      autoCapitalize="none"
                      autoCorrect={true}
                      textContentType="password"
                      autoComplete="password"
                      inputMode="text"
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <Text style={{ color: 'red', marginLeft: 8 }}>
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </View>
            </View>
          )}
        </View>

        <View style={styles.formButtonContainer}>
          {responseError && <Text style={{ color: Colors.red }}>{responseError}</Text>}
          <RoundedButton
            text={step == 3 ? 'CRIAR CONTA' : 'AVANÇAR'}
            onPress={handleNextStep}
            disabled={loading}
          />
        </View>
      </View>

      <View style={styles.formStepsContainer}>
        <Stepper onPress={() => setStep(1)} active={step == 1} />
        <Stepper onPress={() => setStep(2)} active={step == 2} />
        <Stepper onPress={() => setStep(3)} active={step == 3} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingTop: 104,
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
  dateContainer: {
    width: '100%',
    position: 'relative',
    marginBottom: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 100,
    fontSize: 16,
    fontWeight: '500',
    width: '100%',
    padding: 16,
    paddingRight: 80,
    backgroundColor: 'transparent',
  },
});
