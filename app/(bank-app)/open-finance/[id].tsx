import Button from '@/components/Button';
import institutionService from '@/services/institutions';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface institution {
  id: number;
  name: string;
  api_url: string;
  logo_url: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export default function BankApp() {
  const router = useRouter();

  const { id, account, agency, start, expiration } = useLocalSearchParams();

  const [institutions, setInstitutions] = useState([] as institution[]);
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

  const institution = institutions.find((institution) => institution.id == Number(id));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: institution?.color, gap: 16 }]}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <ChevronLeft color={'#fff'} onPress={() => router.back()} />
      </View>

      {institution && (
        <Image
          source={{ uri: institution?.logo_url }}
          width={96}
          height={96}
          style={{ backgroundColor: '#fff', borderRadius: 100 }}
        />
      )}

      <View
        style={{ width: '100%', backgroundColor: '#fff', padding: 12, borderRadius: 10, gap: 8 }}
      >
        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 4 }}>
          <Image
            source={require('@/assets/images/open-finance.png')}
            style={{ width: 24, height: 24 }}
          />
          <Text style={{ fontWeight: 'bold' }}>Compartilhamento via Open Finance</Text>
        </View>
        <Text>Instituicão: {institution?.name}</Text>
        <Text>Conta: {account}</Text>
        <Text>Agência: {agency}</Text>
      </View>

      <Button
        text="COMPARTILHAR DADOS"
        color="#fff"
        textColor="#000"
        onPress={() => router.push(`/(open-finance)/open-finance`)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#fff',
    zIndex: -2,
    display: 'flex',
    alignItems: 'center',
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
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginLeft: 8,
  },
});
