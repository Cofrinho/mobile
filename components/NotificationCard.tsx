import Colors from '@/constants/colors';

import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import MoneyText from './MoneyText';

import { getTransactionIconAndColor } from '@/utils/transactionStyleUtils';

type props = TouchableOpacityProps & {
  id: string;
  type: string;
  title: string;
  value: number;
  description: string;
  date: string;
  icon: React.ReactNode;
  group?: string;
  seen: boolean;
  onPress?: () => void;
};

export default function NotificationCard({
  id,
  type,
  title,
  value,
  description,
  date,
  group,
  seen,
  onPress,
}: props) {
  const { icon, color, prefix } = getTransactionIconAndColor(type);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(date);
    const time = date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return `${day} ${month} • ${time}`;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderWidth: 1,
        borderColor: Colors.lightGray2,
        backgroundColor: seen ? '#fff' : Colors.secondary,
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
          <View style={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
            <Text style={{ fontWeight: '600', color }}>{prefix}</Text>
            <MoneyText amount={value} color={color} size={12} />
          </View>
          <Text style={{ marginTop: 4 }}>{description}</Text>
          <Text style={{ marginTop: 4 }}>{formatDate(date)}</Text>
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
            {group}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
