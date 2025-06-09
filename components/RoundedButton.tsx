import Colors from '@/constants/colors';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface props {
  text: string;
  href?: string;
  onPress?: VoidFunction;
  disabled?: boolean;
}

export default function RoundedButton({ text, href, onPress, disabled }: props) {
  return (
    <TouchableOpacity
      style={disabled ? styles.buttonDisabled : styles.button}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{disabled ? 'Carregando...' : text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 100,
    backgroundColor: Colors.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonDisabled: {
    padding: 16,
    borderRadius: 100,
    backgroundColor: Colors.primary + '66', // ainda mais suave para desabilitado
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
