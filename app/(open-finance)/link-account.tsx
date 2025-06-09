import CircleIconButton from '@/components/CircleIconButton';
import ErrorText from '@/components/ErrorText';
import Input from '@/components/Input';
import OFInstitutionCard from '@/components/OFInstitutionCard';
import RequestErrorText from '@/components/RequestErrorText';
import Colors from '@/constants/colors';
import institutionService from '@/services/institutions';
import { useRouter } from 'expo-router';
import { Info, Search, TriangleAlert, Undo2 } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';

interface institution {
  id: number;
  name: string;
  api_url: string;
  logo_url: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export default function LinkAccount() {
  const router = useRouter();

  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const data = await institutionService.findAll();
        setInstitutions(data);
        return data;
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutions();
  }, []);

  const renderItem = ({ item }: { item: institution }) => (
    <OFInstitutionCard
      logo={item.logo_url}
      name={item.name}
      onPress={() => router.push(`/(open-finance)/link-expiration/${item.id}`)}
    />
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
          {!loading && !error && institutions && (
            <FlatList
              data={institutions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ paddingVertical: 12 }}
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
              showsVerticalScrollIndicator={false}
              style={{ flexGrow: 0 }}
            />
          )}

          {loading && !error && <ActivityIndicator />}

          {error && !loading && <RequestErrorText text={error} />}
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
