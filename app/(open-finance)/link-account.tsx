import AnimatedView from '@/components/AnimatedView';
import CircleIconButton from '@/components/CircleIconButton';
import ErrorText from '@/components/ErrorText';
import Input from '@/components/Input';
import OFInstitutionCard from '@/components/OFInstitutionCard';
import RequestErrorText from '@/components/RequestErrorText';
import Colors from '@/constants/colors';
import { AuthContext } from '@/contexts/AuthContext';
import institutionService, { Institutions } from '@/services/institutions';
import openFinanceService, { GetAllConsentData } from '@/services/open-finance';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { Info, Search, TriangleAlert, Undo2 } from 'lucide-react-native';
import { useCallback, useContext, useEffect, useState } from 'react';
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
  const { user } = useContext(AuthContext);
  const { hasAccount } = useLocalSearchParams();

  const [institutions, setInstitutions] = useState([] as Institutions[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [alreadyLinkedInstitutions, setAlreadyLinkedInstitutions] = useState<GetAllConsentData[]>(
    [],
  );

  useFocusEffect(
    useCallback(() => {
      const fetchInstitutions = async () => {
        try {
          const data = await institutionService.findAll();

          if (hasAccount == 'true') {
            const alreadyLinkedIntitutionsData = await openFinanceService.getAllConsents(
              Number(user?.id),
            );

            setAlreadyLinkedInstitutions(
              alreadyLinkedIntitutionsData.filter((consent) => consent.id > 0),
            );
          }

          setInstitutions(data);
          return data;
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchInstitutions();
    }, []),
  );

  const renderItem = ({ item }: { item: institution }) => (
    <OFInstitutionCard
      logo={item.logo_url}
      name={item.name}
      onPress={() =>
        router.push(
          `/(open-finance)/link-expiration/${item.id}?name=${item.name}&logo=${item.logo_url}`,
        )
      }
      alreadyLinked={
        hasAccount == 'true'
          ? alreadyLinkedInstitutions.some((consent) => consent.institution_id === item.id)
          : false
      }
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

          {loading && !error && (
            <View style={{ gap: 8 }}>
              <AnimatedView width={'100%'} height={70} />
              <AnimatedView width={'100%'} height={70} />
              <AnimatedView width={'100%'} height={70} />
            </View>
          )}

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
