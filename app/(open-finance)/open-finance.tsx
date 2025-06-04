import Button from '@/components/Button';
import CircleIconButton from '@/components/CircleIconButton';
import OFAccountCard from '@/components/OFAccountCard';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { Undo2 } from 'lucide-react-native';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

const accounts = [
  {
    id: '1',
    logo: 'https://designconceitual.com.br/wp-content/uploads/2023/12/Ita%C3%BA-novo-logotipo-2023-1000x600.jpg',
    name: 'Itaú',
    amount: 1000,
    account: '124938439',
    agency: '0001',
  },
  {
    id: '2',
    logo: 'https://cdn-1.webcatalog.io/catalog/nubank/nubank-icon-filled-256.png?v=1745196590866',
    name: 'Nubank',
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

export default function OpenFinance() {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <CircleIconButton
          color={Colors.secondary}
          icon={<Undo2 size={24} color={Colors.primary} />}
          onPress={() => router.back()}
        />

        <View style={styles.titleContainer}>
          <Image
            source={require('../../assets/images/open-finance.png')}
            style={{ width: 24, height: 24 }}
          />

          <Text style={styles.title}>Open Finance</Text>
        </View>
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

      <Button text="adicionar conta" onPress={() => router.push('/(open-finance)/link-account')} />
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
  },
});
