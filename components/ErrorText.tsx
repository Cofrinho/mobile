import Colors from '@/constants/colors';
import { StyleSheet, Text, TextInputProps } from 'react-native';

type props = TextInputProps & {
  text: string | undefined;
};

export default function ErrorText({ text, ...props }: props) {
  return <Text style={styles.text}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: Colors.red,
    fontWeight: 'semibold',
  },
});
