import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function CurrencyInput() {
  const [rawValue, setRawValue] = useState(''); // cents

  function formatCurrency(value: string) {
    const number = Number(value) / 100;
    if (isNaN(number) || number < 0.01) return 'R$ 0,00';

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(number);
  }

  function handleChange(text: string) {
    const digitsOnly = text.replace(/\D/g, '');
    const cleaned = digitsOnly.replace(/^0+/, '') || '0';
    const limited = cleaned.slice(0, 8);

    setRawValue(limited);
  }

  return (
    <View style={styles.amountContainer}>
      <Text style={{ fontWeight: 'bold', fontSize: 32 }}>R$</Text>
      <TextInput
        style={styles.amount}
        keyboardType="numeric"
        onChangeText={handleChange}
        value={formatCurrency(rawValue).replace('R$', '').trim()}
        maxLength={15}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flex: 1,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF939E',
    fontSize: 32,
    marginLeft: 8,
    paddingVertical: 4,
    minWidth: 120,
    textAlign: 'center',
  },
});
