import Colors from '@/constants/colors';
import { DimensionValue, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type props = TouchableOpacityProps & {
  icon: React.ReactNode;
  color: string;
  width?: DimensionValue;
  height?: DimensionValue;
  border?: boolean;
};

export default function CircleIconButton({ icon, color, border, width, height, ...props }: props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color || Colors.primary },
        border ? { borderWidth: 1, borderColor: Colors.primary } : null,
        { width: width || 32 },
        { height: height || 32 },
      ]}
      {...props}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
