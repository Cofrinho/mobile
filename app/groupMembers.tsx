import CircleIconButton from '@/components/CircleIconButton';
import Colors from '@/constants/colors';
import { router } from 'expo-router';
import { LogOut, Star, Undo2 } from 'lucide-react-native';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  dateJoined: string;
  isGroupOwner: boolean;
}

const groupMembersArray = [
  {
    id: '1',
    name: 'Usuário da Silva',
    avatar: 'https://i.pravatar.cc/100?img=3',
    dateJoined: '2023-10-01',
    isGroupOwner: true,
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    avatar: 'https://i.pravatar.cc/100?img=4',
    dateJoined: '2023-10-02',
    isGroupOwner: false,
  },
  {
    id: '3',
    name: 'João Pereira',
    avatar: 'https://i.pravatar.cc/100?img=5',
    dateJoined: '2023-10-03',
    isGroupOwner: false,
  },
  {
    id: '4',
    name: 'Ana Costa',
    avatar: 'https://i.pravatar.cc/100?img=6',
    dateJoined: '2023-10-04',
    isGroupOwner: false,
  },
  {
    id: '5',
    name: 'Carlos Souza',
    avatar: 'https://i.pravatar.cc/100?img=7',
    dateJoined: '2023-10-05',
    isGroupOwner: false,
  },
  {
    id: '6',
    name: 'Fernanda Lima',
    avatar: 'https://i.pravatar.cc/100?img=8',
    dateJoined: '2023-10-06',
    isGroupOwner: false,
  },
  {
    id: '7',
    name: 'Ricardo Santos',
    avatar: 'https://i.pravatar.cc/100?img=9',
    dateJoined: '2023-10-07',
    isGroupOwner: false,
  },
  {
    id: '8',
    name: 'Patrícia Almeida',
    avatar: 'https://i.pravatar.cc/100?img=10',
    dateJoined: '2023-10-08',
    isGroupOwner: false,
  },
];

const isGroupOwner = true;

export default function GroupMembers() {
  const renderItem = ({ item }: { item: GroupMember }) => (
    <View style={styles.memberCard}>
      <Image source={{ uri: item.avatar }} style={styles.memberCardAvatar} />
      <View>
        <Text style={styles.memberCardTitle}>{item.name}</Text>
        <Text style={styles.memberCardSubTitle}>
          Entrou em
          {new Date(item.dateJoined).toLocaleDateString('pt-BR', {
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
        <View style={styles.membersList}>
          <FlatList
            data={groupMembersArray}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={() => (
              <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum membro encontrado</Text>
            )}
          />
        </View>
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
