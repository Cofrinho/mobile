import Colors from '@/constants/colors';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

type SubtitleProps = {
  children: React.ReactNode;
  center?: boolean;
};

export default function Subtitle({ children, center }: SubtitleProps) {
  return <Text style={[styles.subtitle, center ? { textAlign: 'center' } : null]}>{children}</Text>;
}

const styles = StyleSheet.create({
  subtitle: {
    color: Colors.lightGray,
    fontSize: 16,
  },
});
