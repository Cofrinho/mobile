import CircleIconButton from '@/components/CircleIconButton';
import Colors from '@/constants/colors';
import { AuthContext } from '@/contexts/AuthContext';
import groupService from '@/services/group';
import { router, useLocalSearchParams } from 'expo-router';
import { LogOut, Star, Undo2 } from 'lucide-react-native';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [participantToRemove, setParticipantToRemove] = useState<string | null>(null);

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

  const onRemove = async () => {
    if (!group) return;
    if (!participantToRemove) return;
    const userId = participantToRemove;
    try {
      await groupService.leaveGroup(group.id.toString(), userId.toString());
      router.back();
    } catch (error) {
      console.error('Erro ao remover membro do grupo:', error);
    }
  };

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
              onPress={() => {
                setParticipantToRemove(item.id);
                setRemoveModalVisible(true);
              }}
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={removeModalVisible}
        onRequestClose={() => setRemoveModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPressOut={() => setRemoveModalVisible(false)}
        >
          <View style={styles.modalContainerWrapper}>
            <TouchableOpacity activeOpacity={1}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Remover membro</Text>
                <Text style={styles.modalText}>
                  Tem certeza que deseja remover o membro do grupo?
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                    onPress={() => setRemoveModalVisible(false)}
                  >
                    <Text style={styles.modalButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: '#df171a' }]}
                    onPress={async () => {
                      setRemoveModalVisible(false);
                      await onRemove();
                    }}
                  >
                    <Text style={[styles.modalButtonText]}>Remover</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
  /* MODAL */
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    width: '80%',
    alignItems: 'center',
  },
  modalContainerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
