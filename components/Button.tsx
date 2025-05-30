import Colors from '@/constants/colors';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface props {
  text: string;
  href?: string;
  onPress?: VoidFunction;
}

export default function Button({ text, href, onPress }: props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
