import Colors from '@/constants/colors';
import { Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Props {
  placeholder: string;
  isPassword?: boolean;
}

export default function RoundedInput({ placeholder, isPassword }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.lightGray}
        secureTextEntry={isPassword && !showPassword}
        autoCapitalize="none"
      />
      {isPassword && (
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowPassword((prev) => !prev)}
          activeOpacity={0.7}
        >
          <Text style={styles.toggleButtonText}>{showPassword ? <EyeOff /> : <Eye />}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 100,
    fontSize: 16,
    fontWeight: '500',
    width: '100%',
    padding: 24,
    paddingRight: 80,
  },
  container: {
    width: '100%',
    position: 'relative',
  },
  toggleButton: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  toggleButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});
