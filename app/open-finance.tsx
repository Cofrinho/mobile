import CircleIconButton from '@/components/CircleIconButton';
import OFAccountCard from '@/components/OFAccountCard';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { Undo2 } from 'lucide-react-native';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <CircleIconButton
            color={Colors.secondary}
            icon={<Undo2 size={24} color={Colors.primary} />}
            onPress={() => router.back()}
          />

          <View style={styles.titleContainer}>
            <Image
              source={require('../assets/images/open-finance.png')}
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
