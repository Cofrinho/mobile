import Colors from '@/constants/colors';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface props {
  active: boolean;
  onPress?: VoidFunction;
}

export default function Stepper({ active, onPress }: props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.stepper,
        active ? { backgroundColor: Colors.primary } : { backgroundColor: Colors.lightGray },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  stepper: {
    width: 12,
    height: 12,
    borderRadius: 100,
  },
});
