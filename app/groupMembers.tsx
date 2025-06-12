import CircleIconButton from '@/components/CircleIconButton';
import Colors from '@/constants/colors';
import { AuthContext } from '@/contexts/AuthContext';
import groupService from '@/services/group';
import { router, useLocalSearchParams } from 'expo-router';
import { LogOut, Star, Undo2 } from 'lucide-react-native';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Group {
  id: number;
  name: string;
  description: string;
  access_code: string;
  image_url: string | null;
  group_owner: number;
  balance: string;
  expenses: Array<{
    id: string;
    name: string;
    total: number;
    created_at: string;
    updated_at: string;
    group_id: number;
    user_id: number;
  }>;
  participants: Array<{
    id: number;
    name: string;
    email: string;
    avatar_url: string | null;
    created_at: string;
    updated_at: string;
  }>;
}

interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  joinedAt: string;
  isGroupOwner: boolean;
}

export default function GroupMembers() {
  const { user } = useContext(AuthContext);
  const { id } = useLocalSearchParams() as { id: string };
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState<Group | null>(null);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const isGroupOwner = group?.group_owner === user?.id;

  useEffect(() => {
    if (!user) {
      console.error('Usuário não autenticado.');
      return;
    }

    const fetchGroups = async () => {
      setLoading(true);
      try {
        const response = await groupService.getById(id);
        setGroup(response);
      } catch (error) {
        console.error('Error fetching groups:', error);
        setGroup(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [user]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!group) return;
      setLoading(true);
      try {
        const response = await groupService.getMembers(group.id.toString());
        setMembers(response);
      } catch (error) {
        console.error('Error fetching group members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [group]);

  const renderItem = ({ item }: { item: GroupMember }) => (
    <View style={styles.memberCard}>
      <Image
        source={{ uri: item.avatar ? item.avatar : 'https://i.sstatic.net/l60Hf.png' }}
        style={styles.memberCardAvatar}
      />
      <View>
        <Text style={styles.memberCardTitle}>{item.name}</Text>
        <Text style={styles.memberCardSubTitle}>
          Entrou em{' '}
          {new Date(item.joinedAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </Text>
      </View>
      {item.isGroupOwner ? (
        <View style={{ marginLeft: 'auto' }}>
          <CircleIconButton
            color={Colors.secondary}
            icon={<Star size={18} color={Colors.primary} />}
            border={true}
          />
        </View>
      ) : (
        isGroupOwner && (
          <View style={{ marginLeft: 'auto' }}>
            <CircleIconButton
              color={Colors.secondary}
              icon={<LogOut size={18} color={Colors.primary} />}
              border={true}
              onPress={() => console.log('Removeu o membro do grupo')}
            />
          </View>
        )
      )}
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <CircleIconButton
            color={Colors.secondary}
            icon={<Undo2 size={24} color={Colors.primary} />}
            onPress={() => router.back()}
          />
          <Text style={styles.title}>Membros</Text>
        </View>
        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          <View style={styles.membersList}>
            <FlatList
              data={members}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              ListEmptyComponent={
                !loading
                  ? () => (
                      <Text style={{ textAlign: 'center', marginTop: 20 }}>
                        Nenhum membro encontrado
                      </Text>
                    )
                  : null
              }
            />
          </View>
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
  membersList: {
    flex: 1,
    justifyContent: 'center',
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  memberCardAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  memberCardTitle: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  memberCardSubTitle: {
    fontSize: 12,
    color: Colors.lightGray,
    fontWeight: '600',
  },
});
