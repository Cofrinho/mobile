import Colors from '@/constants/colors';
import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import MoneyText from './MoneyText';

type props = TouchableOpacityProps & {
  title: string;
  icon: React.ReactNode;
  value: number;
  group?: string;
};

export default function TransactionCard({ title, icon, value, group }: props) {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: Colors.lightGray2,
        display: 'flex',
        justifyContent: 'center',
        height: 64,
        borderRadius: 10,
        paddingHorizontal: 12,
      }}
    >
      <View style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
        <View
          style={{
            backgroundColor: Colors.secondary,
            borderRadius: 100,
            width: 44,
            height: 44,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {icon}
        </View>

        <View style={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Text style={{ color: Colors.lightGray, fontWeight: 'bold' }}>{title}</Text>
          <MoneyText amount={49} color={Colors.green} size={12} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
