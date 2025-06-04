import Button from '@/components/Button';
import CircleIconButton from '@/components/CircleIconButton';
import Input from '@/components/Input';
import MoneyText from '@/components/MoneyText';
import Stepper from '@/components/Stepper';
import Colors from '@/constants/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar, ChevronDown, ChevronUp, ReceiptText, Undo2 } from 'lucide-react-native';
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

export default function CreateExpenseTwo() {
  const { name, description, due, usersParticipants, totalValue } = useLocalSearchParams();

  const router = useRouter();

  const renderItem = ({ item }: { item: Participant }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 10,
          borderColor: Colors.primary,
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

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 32 }}>
          <View style={{ flexDirection: 'row', width: 40, gap: 4 }}>
            <Input
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                borderBottomWidth: 1,
                borderBottomColor: Colors.primary,
                textAlign: 'center',
              }}
              defaultValue="33"
              inputMode="numeric"
              keyboardType="numeric"
            />

            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>%</Text>
          </View>

          <View>
            <TouchableOpacity>
              <ChevronUp />
            </TouchableOpacity>

            <TouchableOpacity>
              <ChevronDown />
            </TouchableOpacity>
          </View>
        </View>
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

      <View style={{ gap: 12, flex: 1 }}>
        <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Despesa</Text>

        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View
            style={{
              backgroundColor: Colors.secondary,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              width: 44,
              height: 44,
              flexShrink: 0,
            }}
          >
            <ReceiptText color={Colors.primary} />
          </View>

          <View style={{ flex: 1, gap: 4 }}>
            <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Racha Picanha</Text>

            <Text style={{ color: Colors.lightGray, fontWeight: 'bold' }}>
              Racha da picanha dos guris do churrasco que vai ocorrer na casa do usuário da silva
              dia 20 de julho.
            </Text>
          </View>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: Colors.lightGray2,
            borderRadius: 10,
            padding: 8,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.secondary,
              borderRadius: 100,
              width: 36,
              height: 36,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Calendar color={Colors.primary} size={20} />
          </View>

          <View>
            <Text style={{ color: Colors.lightGray, fontWeight: 'bold', fontSize: 12 }}>
              Vencimento
            </Text>
            <Text style={{ color: Colors.primary, fontWeight: 'bold', fontSize: 12 }}>
              22/07/2025
            </Text>
          </View>
        </View>

        <View style={{ gap: 4 }}>
          <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Valor total</Text>
          <MoneyText amount={3000} size={20} />
        </View>

        <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Participantes</Text>

        <FlatList
          data={participants}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 12 }}
        />
      </View>

      <View style={{ gap: 16 }}>
        <View style={{ flexDirection: 'row', gap: 4, justifyContent: 'center' }}>
          <Stepper active={false} />
          <Stepper active={true} />
        </View>

        <Button text="PROSSEGUIR" onPress={() => router.push('/')} />
      </View>
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
