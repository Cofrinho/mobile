import Colors from '@/constants/colors';
import { Bell } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import CircleIconButton from './CircleIconButton';

type props = {
  quantity: number;
};

export default function NotificationButton({ quantity }: props) {
  return (
    <View>
      <CircleIconButton
        color={Colors.secondary}
        icon={<Bell color={Colors.primary} width={24} height={24} />}
        width={44}
        height={44}
      />

      <View style={styles.quantity}>
        <Text style={styles.quantityValue}>{quantity}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  quantity: {
    position: 'absolute',
    backgroundColor: Colors.primary,
    width: 16,
    height: 16,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityValue: {
    color: '#fff',
    fontSize: 12,
  },
});
