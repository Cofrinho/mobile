import Colors from '@/constants/colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface props {
  text: string;
  onPress?: VoidFunction;
  icon?: React.ReactNode;
  color?: string;
  textColor?: string;
  center?: boolean;
  uppercase?: boolean;
}

export default function Button({
  text,
  onPress,
  icon,
  color,
  textColor,
  center = true,
  uppercase = true,
}: props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        color ? { backgroundColor: color } : { backgroundColor: Colors.primary },
        center ? { justifyContent: 'center' } : { justifyContent: 'flex-start' },
      ]}
      onPress={onPress}
    >
      {icon}
      <Text
        style={[
          styles.text,
          textColor ? { color: textColor } : { color: '#fff' },
          uppercase ? { textTransform: 'uppercase' } : null,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: 4,
    flexDirection: 'row',
  },
  text: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
