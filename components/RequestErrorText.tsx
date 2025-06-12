import Colors from '@/constants/colors';
import { TriangleAlert } from 'lucide-react-native';
import { Text, TextProps, View } from 'react-native';

type props = TextProps & {
  text: string | undefined;
};

export default function RequestErrorText({ text }: props) {
  return (
    <View
      style={{
        width: '100%',
        borderWidth: 1,
        padding: 12,
        borderRadius: 10,
        borderColor: Colors.red,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
      }}
    >
      <TriangleAlert color={Colors.red} size={20} />

      <Text
        style={{
          color: Colors.red,
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {text}
      </Text>
    </View>
  );
}
