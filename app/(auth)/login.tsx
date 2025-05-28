import ErrorText from '@/components/ErrorText';
import RoundedButton from '@/components/RoundedButton';
import RoundedInput from '@/components/RoundedInput';
import Subtitle from '@/components/Subtitle';
import Colors from '@/constants/colors';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';

const loginFormSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve possuir no mínimo 6 caracteres'),
});

type FormData = z.infer<typeof loginFormSchema>;

export default function Login() {
  const router = useRouter();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: FormData) => {
    // TODO: enviar dados para o back-end validar e fazer a lógica de autenticação baseada na resposta
    console.log(data);
  };

  const password = watch('password');
  const showPasswordError = !!errors.password && password?.length < 6;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Entre na sua Conta</Text>
        <Subtitle>Começe a dividir suas despesas</Subtitle>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formFieldsContainer}>
          <View style={styles.inputContainer}>
            <RoundedInput
              placeholder="Email"
              onChangeText={(text) => setValue('email', text)}
              {...register('email')}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              autoComplete="email"
              inputMode="email"
            />
            <View style={styles.formErrorContainer}>
              {errors.email && <ErrorText text={errors.email.message} />}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <RoundedInput
              placeholder="Senha"
              onChangeText={(text) => setValue('password', text)}
              {...register('password')}
              isPassword
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={true}
              textContentType="password"
              autoComplete="password"
              inputMode="text"
            />
            <View style={styles.formErrorContainer}>
              {errors.password && showPasswordError && (
                <ErrorText text={errors.password?.message} />
              )}
            </View>
          </View>
        </View>

        <View style={styles.formButtonContainer}>
          <RoundedButton text="LOGIN" onPress={handleSubmit(onSubmit)} />
          <TouchableOpacity onPress={() => router.push('/forgot-password')}>
            <Text style={styles.text}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.registerContainer}>
        <Subtitle>Não possui uma conta?</Subtitle>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.text}>Registrar</Text>
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
  formErrorContainer: {
    marginLeft: 16,
  },
  inputContainer: {
    gap: 4,
  },
});
