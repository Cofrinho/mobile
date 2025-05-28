import Colors from '@/constants/colors';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

export default function CodeInput({ ...props }: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.lightGray}
        {...props}
        maxLength={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 10,
    fontSize: 16,
    width: 50,
    height: 50,
    fontWeight: '500',
    padding: 16,
    textAlign: 'center',
  },
  container: {},
  toggleButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});
