import Button from '@/components/Button';
import CircleIconButton from '@/components/CircleIconButton';
import Input from '@/components/Input';
import Stepper from '@/components/Stepper';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { Check, Undo2 } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const participants = [
  {
    id: '1',
    name: 'Usuário da Silva',
    image: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Maria Joaquina',
    image: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'João da Silva',
    image: 'https://i.pravatar.cc/150?img=3',
  },
];

interface Participant {
  id: string;
  name: string;
  image: string;
}

export default function CreateExpense() {
  const router = useRouter();

  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    participants.map((p) => p.id),
  );

  const toggleParticipant = (id: string) => {
    setSelectedParticipants((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const renderItem = ({ item }: { item: Participant }) => {
    const isSelected = selectedParticipants.includes(item.id);

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => toggleParticipant(item.id)}
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 10,
          borderColor: Colors.primary,
          backgroundColor: isSelected ? Colors.secondary : '#fff',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <Image
            source={{ uri: item.image }}
            style={{
              backgroundColor: Colors.secondary,
              width: 44,
              height: 44,
              borderRadius: 100,
            }}
          />
          <Text style={{ color: Colors.primary, fontWeight: '500' }}>{item.name}</Text>
        </View>

        {isSelected && <Check size={22} color={Colors.primary} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CircleIconButton
          color={Colors.secondary}
          icon={<Undo2 size={24} color={Colors.primary} />}
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Criar Despesa</Text>
      </View>

      <View style={{ gap: 12 }}>
        <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Insira os dados</Text>
        <View>
          <Input placeholder="Nome da despesa" />
          <Input placeholder="Descrição da despesa" />
          <Input placeholder="Valor total" />
          <Input placeholder="Data de vencimento" />
        </View>

        <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Participantes</Text>

        <FlatList
          data={participants}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 12 }}
        />

        <View style={{ flexDirection: 'row', gap: 4, justifyContent: 'center' }}>
          <Stepper active={true} />
          <Stepper active={false} />
        </View>

        <Button text="PROSSEGUIR" onPress={() => router.push('/(expense)/create-expense-two')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    zIndex: -2,
    backgroundColor: '#fff',
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
    zIndex: -1,
    fontSize: 16,
  },
});
