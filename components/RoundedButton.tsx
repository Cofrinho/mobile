import Colors from '@/constants/colors';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface props {
  text: string;
  href?: string;
}

export default function RoundedButton({ text, href }: props) {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 24,
    borderRadius: 100,
    backgroundColor: Colors.primary,
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
