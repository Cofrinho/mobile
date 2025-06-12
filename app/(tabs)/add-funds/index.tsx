import Button from '@/components/Button';
import ErrorText from '@/components/ErrorText';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { Check, ShowerHead } from 'lucide-react-native';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddFunds() {
  const router = useRouter();

  const [ofSelected, setOfSelected] = useState(true);

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

  const [hasTouched, setHasTouched] = useState(false);

  function handleChange(text: string) {
    if (!hasTouched) setHasTouched(true);

    const digitsOnly = text.replace(/\D/g, '');
    const cleaned = digitsOnly.replace(/^0+/, '') || '0';
    const limited = cleaned.slice(0, 8);

    setRawValue(limited);
  }

  const numericValue = Number(rawValue) / 100;
  const showError = hasTouched && (numericValue <= 0 || numericValue > 5000);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
          Adicionar saldo ao Cofrinho
        </Text>
      </View>

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

      <View
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>
          Selecionar forma de pagamento
        </Text>

        <TouchableOpacity
          style={[
            {
              borderWidth: 1,
              borderColor: Colors.primary,
              padding: 12,
              borderRadius: 10,
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
            },
            ofSelected ? { backgroundColor: Colors.secondary } : null,
          ]}
          onPress={() => setOfSelected(!ofSelected)}
        >
          <View style={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center' }}>
            <Image
              source={require('@/assets/images/open-finance.png')}
              style={{ width: 20, height: 20 }}
            />
            <Text style={{ fontWeight: 'bold' }}>Open Finance</Text>
          </View>

          {ofSelected && <Check color={Colors.primary} size={20} />}
        </TouchableOpacity>

        <Button
          text="PROSSEGUIR PARA O PAGAMENTO"
          onPress={() => router.replace(`/(open-finance)/select-payment-account/${rawValue}`)}
          disabled={!ofSelected || showError || !rawValue}
        />

        {!ofSelected && (
          <View>
            <ErrorText text="Selecione uma forma de pagamento" />
          </View>
        )}

        {showError && (
          <View>
            <ErrorText text="Insira um valor válido. Min: R$ 0,01, Max: R$ 5.000" />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  header: {
    position: 'relative',
    height: 48,
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    zIndex: -1,
  },
  amountContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    flexDirection: 'row',
    gap: 8,
  },
  amount: {
    textAlign: 'center',
    fontSize: 32,
    minWidth: 64,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  institutions: {
    marginTop: 40,
  },
});
