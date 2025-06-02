import Colors from '@/constants/colors';
import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import MoneyText from './MoneyText';

type props = TouchableOpacityProps & {
  id: string;
  title: string;
  value: number;
  description: string;
  date: string;
  icon: React.ReactNode;
  group?: string;
};

export default function NotificationCard({
  id,
  title,
  value,
  description,
  date,
  icon,
  group,
}: props) {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: Colors.lightGray2,
        display: 'flex',
        justifyContent: 'center',
        minHeight: 64,
        borderRadius: 10,
        padding: 12,
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
          <Text style={{ fontWeight: 'bold' }}>{title}</Text>
          <MoneyText
            amount={value}
            size={12}
            color={
              id === 'cofrinho'
                ? Colors.green
                : id === 'group'
                  ? Colors.primary
                  : id === 'due'
                    ? Colors.red
                    : Colors.black
            }
          />
          <Text style={{ marginTop: 4 }}>{description}</Text>
          <Text style={{ marginTop: 4 }}>{date}</Text>
        </View>

        {group && (
          <Text
            style={{
              position: 'absolute',
              right: 0,
              backgroundColor: Colors.secondary,
              color: Colors.primary,
              borderRadius: 100,
              paddingHorizontal: 12,
              paddingVertical: 2,
              fontSize: 12,
            }}
          >
            Grupo {group}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
