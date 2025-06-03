import Button from '@/components/Button';
import CircleIconButton from '@/components/CircleIconButton';
import SelectOFAccount from '@/components/SelectAccount';
import Colors from '@/constants/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Undo2 } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const accounts = [
  {
    id: '1',
    logo: 'https://designconceitual.com.br/wp-content/uploads/2023/12/Ita%C3%BA-novo-logotipo-2023-1000x600.jpg',
    name: 'Itaú',
    institution: 1,
    amount: 1000,
    account: '124938439',
    agency: '0001',
  },
  {
    id: '2',
    logo: 'https://cdn-1.webcatalog.io/catalog/nubank/nubank-icon-filled-256.png?v=1745196590866',
    name: 'Nubank',
    institution: 2,
    amount: 324,
    account: '99763525',
    agency: '0001',
  },
];

interface account {
  id: string;
  logo: string;
  name: string;
  amount: number;
  account: string;
  agency: string;
}

export default function SelectPaymentAccount() {
  const router = useRouter();

  const { value } = useLocalSearchParams();

  const [selectedAccount, setSelectedAccount] = useState(0);

  const amountFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value) / 100);

  const renderItem = ({ item }: { item: account }) => (
    <SelectOFAccount
      logo={item.logo}
      name={item.name}
      amount={item.amount}
      account={item.account}
      agency={item.agency}
      onPress={() => setSelectedAccount(Number(item.id))}
      selected={selectedAccount == Number(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CircleIconButton
          color={Colors.secondary}
          icon={<Undo2 size={24} color={Colors.primary} />}
          onPress={() => router.back()}
        />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Selecione uma conta para realizar o pagamento</Text>
        </View>
      </View>

      <View style={{ gap: 4, paddingVertical: 24 }}>
        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
          Valor a ser pago
        </Text>
        <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>
          {amountFormatted}
        </Text>
      </View>

      <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Contas conectadas</Text>

      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        showsVerticalScrollIndicator={false}
        style={{ flexGrow: 0 }}
      />

      <Button
        text="CONFIRMAR PAGAMENTO"
        onPress={() => router.push(`/(bank-app)/payment/${selectedAccount}?value=${value}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#fff',
    zIndex: -2,
  },
  header: {
    position: 'relative',
    height: 48,
    justifyContent: 'center',
    marginBottom: 12,
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 16,
    zIndex: -1,
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: 200,
  },
});
