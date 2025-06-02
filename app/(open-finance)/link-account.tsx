import CircleIconButton from '@/components/CircleIconButton';
import Input from '@/components/Input';
import OFInstitutionCard from '@/components/OFInstitutionCard';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { Search, Undo2 } from 'lucide-react-native';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

const institutions = [
  {
    id: '1',
    name: 'Nubank',
    logo: 'https://cdn-1.webcatalog.io/catalog/nubank/nubank-icon-filled-256.png?v=1745196590866',
  },
  {
    id: '2',
    name: 'Itaú',
    logo: 'https://designconceitual.com.br/wp-content/uploads/2023/12/Ita%C3%BA-novo-logotipo-2023-1000x600.jpg',
  },
];

interface institution {
  id: string;
  name: string;
  logo: string;
}

export default function LinkAccount() {
  const router = useRouter();

  const renderItem = ({ item }: { item: institution }) => (
    <OFInstitutionCard logo={item.logo} name={item.name} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CircleIconButton
          color={Colors.secondary}
          icon={<Undo2 size={24} color={Colors.primary} />}
          onPress={() => router.back()}
        />

        <View style={styles.titleContainer}>
          <Image
            source={require('../../assets/images/open-finance.png')}
            style={{ width: 24, height: 24 }}
          />

          <Text style={styles.title}>Open Finance</Text>
        </View>
      </View>

      <View>
        <View style={{ gap: 16 }}>
          <Text style={{ color: Colors.primary, fontWeight: '700' }}>
            Selecione uma instituição
          </Text>
          <Input placeholder="Buscar instituição" icon={<Search color={Colors.primary} />} />
        </View>

        <View>
          <FlatList
            data={institutions}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingVertical: 12 }}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            showsVerticalScrollIndicator={false}
            style={{ flexGrow: 0 }}
          />
        </View>
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
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 16,
    zIndex: -1,
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
});
