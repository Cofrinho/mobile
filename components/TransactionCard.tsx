import Colors from '@/constants/colors';
import { BanknoteArrowDown, BanknoteArrowUp } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import MoneyText from './MoneyText';

type props = TouchableOpacityProps & {
  operation: string;
  title: string;
  value: number;
  group?: string;
};

export default function TransactionCard({ operation, title, value, group }: props) {
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
          {operation === 'in' ? (
            <BanknoteArrowUp color={Colors.primary} />
          ) : (
            <BanknoteArrowDown color={Colors.primary} />
          )}
        </View>

        <View style={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Text style={{ color: Colors.lightGray, fontWeight: 'bold' }}>{title}</Text>

          <View style={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
            {operation === 'in' ? (
              <Text
                style={{
                  fontWeight: 'semibold',
                  color: operation === 'in' ? Colors.green : Colors.red,
                }}
              >
                +
              </Text>
            ) : (
              <Text
                style={{
                  fontWeight: 'semibold',
                  color: operation === 'in' ? Colors.green : Colors.red,
                }}
              >
                -
              </Text>
            )}
            <MoneyText
              amount={value}
              color={operation === 'in' ? Colors.green : Colors.red}
              size={12}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
