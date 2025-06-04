import CircleIconButton from '@/components/CircleIconButton';
import NotificationCard from '@/components/NotificationCard';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { AlertTriangle, BanknoteArrowUp, PiggyBank, Undo2 } from 'lucide-react-native';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const notificationsArray = [
  {
    id: 'cofrinho',
    title: 'Recarga cofrinho',
    value: 49,
    description: 'Recarga recebida de Nubank',
    date: '07 abr. • 15:30',
    icon: <PiggyBank color={Colors.primary} />,
  },
  {
    id: 'group',
    title: 'Racha churras',
    value: 75,
    description: 'Contribua com o churras',
    date: '07 abr. • 15:30',
    icon: <BanknoteArrowUp color={Colors.primary} />,
    group: '1',
  },
  {
    id: 'due',
    title: 'Lembrete',
    value: 77,
    description: 'Conta de luz vence amanhã',
    date: '07 abr. • 15:30',
    icon: <AlertTriangle color={Colors.primary} />,
    group: '4',
  },
];

interface notification {
  id: string;
  title: string;
  value: number;
  description: string;
  date: string;
  icon: React.ReactNode;
  group?: string;
}

export default function Notifications() {
  const router = useRouter();

  const renderItem = ({ item }: { item: notification }) => (
    <NotificationCard
      id={item.id}
      title={item.title}
      value={item.value}
      icon={item.icon}
      description={item.description}
      date={item.date}
      group={item.group}
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
          <Text style={styles.title}>Notificações</Text>
        </View>

        <FlatList
          data={notificationsArray}
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
