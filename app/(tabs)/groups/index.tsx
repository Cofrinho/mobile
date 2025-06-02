import Button from '@/components/Button';
import CircleIconButton from '@/components/CircleIconButton';
import GroupCard from '@/components/GroupCard';
import Input from '@/components/Input';
import Colors from '@/constants/colors';
import { Plus, X } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const groupsArray = [
  {
    id: '1',
    title: 'Churrascada',
    members: 7,
    image:
      'https://minervafoods.com/wp-content/uploads/2023/02/Acompanhamento-para-churrasco-confira-8-opcoes-saborosas-scaled.jpg',
  },
  {
    id: '2',
    title: 'Viagem praia',
    members: 12,
    image: 'https://static.ndmais.com.br/2023/12/praia-tropical-com-areia-branca-scaled.jpg',
  },
];

interface Group {
  id: string;
  title: string;
  members: number;
  image: string;
}

export default function Groups() {
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item }: { item: Group }) => (
    <GroupCard
      title={item.title}
      members={item.members}
      image={item.image}
      href={`../../group/${item.id}`}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 16,
          }}
        >
          <Text style={styles.title}>Grupos</Text>
          <CircleIconButton icon={<Plus color="#FFFFFF" />} color={Colors.primary} border={false} />
        </View>
        <FlatList
          data={groupsArray}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 4 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Button text="Entrar em um grupo" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPressOut={() => setModalVisible(false)}
            style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}
          >
            <View
              style={{
                width: '80%',
                height: 'auto',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                padding: 20,
                borderRadius: 25,
              }}
              onStartShouldSetResponder={() => true}
            >
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <X color={Colors.primary} />
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 40 }}>
                Entrar em um grupo
              </Text>
              <Input
                placeholder="Código do grupo"
                autoCapitalize="characters"
                autoCorrect={false}
                keyboardType="default"
                textContentType="none"
                autoComplete="off"
                inputMode="text"
              />
              <Button text="Entrar" onPress={() => setModalVisible(false)} />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  subcontainer: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
  },
});
