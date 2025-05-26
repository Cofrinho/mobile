import Colors from '@/constants/colors';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

type SubtitleProps = {
  children: React.ReactNode;
};

export default function Subtitle({ children }: SubtitleProps) {
  return <Text style={styles.subtitle}>{children}</Text>;
}

const styles = StyleSheet.create({
  subtitle: {
    color: Colors.lightGray,
    fontSize: 16,
  },
});
