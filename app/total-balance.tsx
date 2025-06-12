import AnimatedView from '@/components/AnimatedView';
import CircleIconButton from '@/components/CircleIconButton';
import MoneyText from '@/components/MoneyText';
import OFAccountCard from '@/components/OFAccountCard';
import Colors from '@/constants/colors';
import openFinanceService from '@/services/open-finance';
import { useRouter } from 'expo-router';
import { Undo2 } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
interface account {
  logo_url: string;
  institutionName: string;
  balance: number;
  account: string;
  agency: string;
}

interface totalBalanceResponse {
  balanceTotal: number;
  accounts: account[];
}

export default function TotalBalance() {
  const router = useRouter();

  const [institutions, setInstitutions] = useState({} as totalBalanceResponse);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const data = await openFinanceService.getDetailedBalance();
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

  const renderItem = ({ item }: { item: account }) => (
    <OFAccountCard
      logo={item.logo_url}
      name={item.institutionName}
      amount={item.balance}
      account={item.account}
      agency={item.agency}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <CircleIconButton
            color={Colors.secondary}
            icon={<Undo2 size={24} color={Colors.primary} />}
            onPress={() => router.back()}
          />
          <Text style={styles.title}>Saldo Total</Text>
        </View>

        <View style={styles.amountContainer}>
          {institutions && !loading ? (
            <Text style={styles.amount}>
              <MoneyText amount={institutions.balanceTotal} color={Colors.black} size={32} />
            </Text>
          ) : (
            <AnimatedView width={150} height={40} />
          )}
        </View>

        {institutions && !loading ? (
          <FlatList
            data={institutions.accounts}
            keyExtractor={(item, index) => item.balance.toString()}
            renderItem={renderItem}
            style={styles.institutions}
            contentContainerStyle={{ paddingVertical: 12 }}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <AnimatedView width={'100%'} height={70} marginTop={40} />
        )}
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
  amountContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amount: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  institutions: {
    marginTop: 40,
  },
});
