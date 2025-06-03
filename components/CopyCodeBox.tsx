import Colors from '@/constants/colors';
import * as Clipboard from 'expo-clipboard';
import { Copy } from 'lucide-react-native'; // ou outro ícone de cópia
import { StyleSheet, Text, ToastAndroid, TouchableOpacity } from 'react-native';

export default function CopyCodeBox({ code }: { code: string }) {
  const handleCopy = () => {
    Clipboard.setStringAsync(code);
    ToastAndroid.show('Código copiado!', ToastAndroid.SHORT);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleCopy}>
      <Text style={styles.code}>{code}</Text>
      <Copy size={20} color={Colors.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: 'auto',
  },
  code: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 20,
    paddingRight: 20,
  },
});
