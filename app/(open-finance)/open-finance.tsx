import AnimatedView from '@/components/AnimatedView';
import Button from '@/components/Button';
import CircleIconButton from '@/components/CircleIconButton';
import OFAccountCard from '@/components/OFAccountCard';
import Colors from '@/constants/colors';
import openFinanceService from '@/services/open-finance';
import { useFocusEffect, useRouter } from 'expo-router';
import { Undo2 } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

function formatDatetime(dateStr: string): string {
  const date = new Date(dateStr);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
}

function formatDate(dateStr: string) {
  if (dateStr == null) return null;

  const date = new Date(dateStr);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

interface account {
  logo_url: string;
  institutionName: string;
  balance: number;
  account: string;
  agency: string;
  expirationDate: string;
  startDate: string;
}

interface totalBalanceResponse {
  balanceTotal: number;
  accounts: account[];
}

export default function OpenFinance() {
  const router = useRouter();

  const [institutions, setInstitutions] = useState({} as totalBalanceResponse);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [hasAccount, setHasAccount] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchInstitutions = async () => {
        try {
          const data = await openFinanceService.getDetailedBalance();
          setInstitutions(data);
          setHasAccount(true);
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

  const renderItem = ({ item }: { item: account }) => (
    <OFAccountCard
      logo={item.logo_url}
      name={item.institutionName}
      amount={item.balance}
      account={item.account}
      agency={item.agency}
      onPress={() =>
        router.push(
          `/(open-finance)/link-successfull/1?logo=${item.logo_url}&institution=${item.institutionName}&start=${formatDatetime(item.startDate)}&expiration=${formatDate(item.expirationDate)}`,
        )
      }
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CircleIconButton
          color={Colors.secondary}
          icon={<Undo2 size={24} color={Colors.primary} />}
          onPress={() => router.push('/(tabs)/account')}
        />

        <View style={styles.titleContainer}>
          <Image
            source={require('../../assets/images/open-finance.png')}
            style={{ width: 24, height: 24 }}
          />

          <Text style={styles.title}>Open Finance</Text>
        </View>
      </View>

      <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Contas conectadas</Text>

      {institutions && !loading && !error && (
        <FlatList
          data={institutions.accounts}
          keyExtractor={(item) => item.balance.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 12 }}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          showsVerticalScrollIndicator={false}
          style={{ flexGrow: 0 }}
        />
      )}

      {loading && <AnimatedView width={'100%'} height={70} marginVertical={12} />}

      {error && (
        <Text
          style={{ marginVertical: 12, fontWeight: 'bold', color: Colors.lightGray, fontSize: 16 }}
        >
          Nenhuma conta encontrada
        </Text>
      )}

      <Button
        text="adicionar conta"
        onPress={() => router.push(`/(open-finance)/link-account?hasAccount=${hasAccount}`)}
      />
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
