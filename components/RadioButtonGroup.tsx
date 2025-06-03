import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
};

export default function RadioButtonGroup({ options, selected, onChange }: Props) {
  return (
    <View>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.option}
          onPress={() => onChange(option.value)}
          activeOpacity={0.8}
        >
          <View style={styles.radioOuter}>
            {selected === option.value && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.label}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF939E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF939E',
  },
  label: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
