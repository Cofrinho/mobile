import Colors from '@/constants/colors';
import { Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

type Props = TextInputProps & {
  placeholder: string;
  isPassword?: boolean;
};

export default function Input({ placeholder, isPassword, ...props }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.lightGray}
        secureTextEntry={isPassword && !showPassword}
        {...props}
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
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: '500',
    width: '100%',
    padding: 14,
    paddingRight: 80,
    marginBottom: 12,
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
