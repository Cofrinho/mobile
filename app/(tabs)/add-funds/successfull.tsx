import RoundedButton from '@/components/RoundedButton';
import Subtitle from '@/components/Subtitle';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { CheckCircle2 } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

export default function Successfull() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Saldo adicionado com sucesso!</Text>
        <Subtitle center>Agora você pode pagar suas despesas</Subtitle>
      </View>

      <View style={styles.checkContainer}>
        <CheckCircle2 color={Colors.primary} size={64} />
      </View>

      <RoundedButton
        onPress={() => router.push('/(tabs)/account')}
        text="VOLTAR PARA A CONTA"
      ></RoundedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleContainer: {
    gap: 8,
  },
  checkContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
});
