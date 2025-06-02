import CircleIconButton from '@/components/CircleIconButton';
import MoneyText from '@/components/MoneyText';
import OFAccountCard from '@/components/OFAccountCard';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { Undo2 } from 'lucide-react-native';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const accounts = [
  {
    id: '1',
    logo: 'sss',
    name: 'Itaú',
    amount: 1000,
    account: '124938439',
    agency: '0001',
  },
  {
    id: '2',
    logo: 'sss',
    name: 'Nubank',
    amount: 324,
    account: '99763525',
    agency: '0001',
  },
];

const totalAmount = 1324;

interface account {
  id: string;
  logo: string;
  name: string;
  amount: number;
  account: string;
  agency: string;
}

export default function TotalBalance() {
  const router = useRouter();

  const renderItem = ({ item }: { item: account }) => (
    <OFAccountCard
      logo={item.logo}
      name={item.name}
      amount={item.amount}
      account={item.account}
      agency={item.agency}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <CircleIconButton
            color={Colors.secondary}
            icon={<Undo2 size={24} color={Colors.primary} />}
            onPress={() => router.back()}
          />
          <Text style={styles.title}>Saldo Total</Text>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amount}>
            <MoneyText amount={totalAmount} color={Colors.black} size={32} />
          </Text>
        </View>

        <FlatList
          data={accounts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.institutions}
          contentContainerStyle={{ paddingVertical: 12 }}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
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
  },
  amount: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  institutions: {
    marginTop: 40,
  },
});
