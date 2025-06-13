import CircleIconButton from '@/components/CircleIconButton';
import NotificationCard from '@/components/NotificationCard';
import Colors from '@/constants/colors';
import { AuthContext } from '@/contexts/AuthContext';
import notificationService from '@/services/notifications';
import { useRouter } from 'expo-router';
import { Undo2 } from 'lucide-react-native';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface notification {
  id: string;
  type: string;
  title: string;
  value: number;
  description: string;
  date: string;
  icon: React.ReactNode;
  group?: string;
  seen: boolean;
}

interface NotificationsProps {
  userId: number;
}

export default function Notifications({ userId }: NotificationsProps) {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [notifications, setNotifications] = useState<notification[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchNotifications() {
      setLoading(true);
      try {
        const data = await notificationService.getNotifications(Number(user?.id));

        setNotifications(data);
      } catch (error) {
        console.error('Error loading notifications', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, [user?.id]);

  const handlePressNotification = async (item: notification) => {
    if (!item.seen) {
      try {
        await notificationService.markAsSeen(Number(item.id));
        setNotifications((prev) => prev.map((n) => (n.id === item.id ? { ...n, seen: true } : n)));
      } catch (error) {
        console.error('Erro ao marcar notificação como vista', error);
      }
    }
  };

  const renderItem = ({ item }: { item: notification }) => (
    <NotificationCard
      id={item.id}
      type={item.type}
      title={item.title}
      value={item.value}
      icon={item.icon}
      description={item.description}
      date={item.date}
      group={item.group}
      seen={item.seen}
      onPress={() => handlePressNotification(item)}
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

        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : notifications.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 32, color: Colors.lightGray }}>
            Nenhuma notificação encontrada.
          </Text>
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ gap: 12, paddingBottom: 16 }}
            showsVerticalScrollIndicator={false}
          />
        )}
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
