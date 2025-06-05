import Button from '@/components/Button';
import CircleIconButton from '@/components/CircleIconButton';
import ExpensiveCard from '@/components/ExpensiveCard';
import SharedGroupModal from '@/components/SharedGroupModal';
import Colors from '@/constants/colors';
import { router, useLocalSearchParams } from 'expo-router';
import { LogOut, Pencil, Trash, Undo2, UserRoundPlus, Users2 } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const groupArray = {
  id: '1',
  name: 'Churrascada',
  image:
    'https://minervafoods.com/wp-content/uploads/2023/02/Acompanhamento-para-churrasco-confira-8-opcoes-saborosas-scaled.jpg',
  organizer: {
    name: 'Usuário da Silva',
    avatar: 'https://i.pravatar.cc/100?img=3',
  },
  participants: 7,
  access_code: '1A3F',
  expenses: [
    { id: '1', name: 'Racha Picanha', total: 130 },
    { id: '2', name: 'Racha Cerveja', total: 150 },
  ],
};
const isGroupOwner = true;

interface Expense {
  id: string;
  name: string;
  total: number;
}

export default function GroupDetails() {
  const { id } = useLocalSearchParams() as { id: string };
  const [modalVisible, setModalVisible] = useState(false);
  const renderItem = ({ item }: { item: Expense }) => (
    <TouchableOpacity onPress={() => router.push(`/(expense)/expense/${item.id}`)}>
      <ExpensiveCard expensive={item} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <CircleIconButton
          color="#FFFFFF"
          icon={<Undo2 size={24} color={Colors.primary} />}
          onPress={() => router.back()}
        />
        <Image
          source={{
            uri: groupArray.image || 'https://i.pravatar.cc/100?img=1',
          }}
          style={styles.groupImage}
        />
      </View>

      <View style={styles.actionsRow}>
        {isGroupOwner ? (
          <>
            <CircleIconButton
              color={Colors.secondary}
              icon={<Pencil size={22} color={Colors.primary} />}
              border={true}
              onPress={() => console.log('Editar grupo')}
            />
            <CircleIconButton
              color={Colors.secondary}
              icon={<UserRoundPlus size={22} color={Colors.primary} />}
              border={true}
              onPress={() => setModalVisible(true)}
            />
            <CircleIconButton
              color={Colors.secondary}
              icon={<Trash size={22} color={Colors.primary} />}
              border={true}
              onPress={() => console.log('Excluir grupo')}
            />
          </>
        ) : (
          <CircleIconButton
            color={Colors.secondary}
            icon={<LogOut size={22} color={Colors.primary} />}
            border={true}
            onPress={() => console.log('Sair')}
          />
        )}

        <TouchableOpacity style={styles.participants} onPress={() => router.push('/groupMembers')}>
          <Users2 size={20} color={Colors.primary} />
          <Text style={styles.participantCount}>{groupArray.participants}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.groupInfo}>
          <Text style={[styles.title, { marginBottom: 20 }]}>{groupArray.name}</Text>
          {isGroupOwner ? (
            <Button text="Criar despesa" onPress={() => router.push('/(expense)/create-expense')} />
          ) : (
            <View style={styles.organizerBox}>
              <Image source={{ uri: groupArray.organizer.avatar }} style={styles.avatar} />
              <View>
                <Text style={styles.organizerName}>{groupArray.organizer.name}</Text>
                <Text style={styles.organizerLabel}>Organizador</Text>
              </View>
            </View>
          )}
        </View>
        <Text style={styles.title}>Despesas</Text>
        <FlatList
          data={groupArray.expenses}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 12 }}
        />
      </View>
      <SharedGroupModal
        code={groupArray.access_code}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    height: 140,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: Colors.primary,
    paddingBottom: 8,
  },
  groupImage: {
    width: 90,
    height: 90,
    borderRadius: 100,
    position: 'absolute',
    bottom: -40,
    left: 24,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  groupInfo: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  organizerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 12,
  },
  organizerName: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  organizerLabel: {
    fontSize: 12,
    color: Colors.lightGray,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    paddingEnd: 16,
    paddingTop: 16,
  },
  participants: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.secondary,
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  participantCount: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
  expensesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 12,
  },
});
