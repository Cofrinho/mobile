import CircleIconButton from '@/components/CircleIconButton';
import TransactionCard from '@/components/TransactionCard';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { Undo2 } from 'lucide-react-native';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const transactionsArray = [
  {
    id: '1',
    operation: 'in',
    title: 'Recarga cofrinho',
    value: 49,
    date: '07 abr. • 15:30',
  },
  {
    id: '2',
    operation: 'out',
    title: 'Racha churras',
    value: 75,
    date: '07 abr. • 15:30',
    group: '1',
  },
];

interface transaction {
  id: string;
  title: string;
  value: number;
  operation: string;
  date: string;
  group?: string;
}

export default function Transactions() {
  const router = useRouter();

  const renderItem = ({ item }: { item: transaction }) => (
    <TransactionCard operation={item.operation} title={item.title} value={item.value} />
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
          <Text style={styles.title}>Entradas e Saídas</Text>
        </View>

        <FlatList
          data={transactionsArray}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 12, paddingBottom: 16 }}
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
});
