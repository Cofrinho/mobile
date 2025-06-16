import CircleIconButton from '@/components/CircleIconButton';
import MoneyText from '@/components/MoneyText';
import NotificationButton from '@/components/NotificationButton';
import OFCard from '@/components/OFCard';
import TransactionCard from '@/components/TransactionCard';
import Colors from '@/constants/colors';
import { AuthContext } from '@/contexts/AuthContext';
import accountService from '@/services/account';
import openFinanceService from '@/services/open-finance';
import { useFocusEffect, useRouter } from 'expo-router';
import { ChevronRight, Eye, EyeClosed, Plus } from 'lucide-react-native';
import { useCallback, useContext, useState } from 'react';
import {
  Animated,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface IAccountData {
  balance: number;
  notifications: number;
  transactions: [];
}

interface IOpenFinanceData {
  balance: number;
  logos: [];
}

interface ITransaction {
  id: string;
  type: string;
  title: string;
  value: number;
  date?: string;
  group?: string;
}

export default function Page() {
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();

  const { user, isAuthenticated } = useContext(AuthContext);

  const [showBalance, setShowBalance] = useState(true);

  const [accountData, setAccountData] = useState({} as IAccountData);
  const [openFinanceData, setOpenFinanceData] = useState({} as IOpenFinanceData);
  const [hasOpenFinanceConsent, setHasOpenFinanceConsent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const accountData = await accountService.mountAccountScreen();
      setAccountData(accountData);
      setTransactions(accountData.transactions?.slice(0, 3) || []);

      const openFinanceData = await openFinanceService.getBalanceAndLogos();
      setHasOpenFinanceConsent(true);
      setOpenFinanceData(openFinanceData);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchAccountData = async () => {
        setLoading(true);
        try {
          const accountData = await accountService.mountAccountScreen();
          setAccountData(accountData);
          setTransactions(accountData.transactions?.slice(0, 3) || []);

          const openFinanceData = await openFinanceService.getBalanceAndLogos();
          setHasOpenFinanceConsent(true);
          setOpenFinanceData(openFinanceData);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchAccountData();
    }, []),
  );

  const LogoItem = ({ url, index }: { url: string; index: number }) => {
    const rightOffset = 24 + index * 12;

    return (
      <Image
        style={{
          width: 24,
          height: 24,
          borderRadius: 100,
          position: 'absolute',
          right: rightOffset,
          backgroundColor: '#fff',
        }}
        source={{ uri: url }}
      />
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: '#fff' }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[Colors.primary]}
          tintColor={Colors.primary}
        />
      }
    >
      <View style={styles.container}>
        <View style={styles.userAndNotificationContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.userContainer}
            onPress={() => router.push('/(user)/user')}
          >
            <View style={styles.userAvatarContainer}>
              {user?.avatar_url ? (
                <Image src={user?.avatar_url} />
              ) : (
                <Text style={styles.avatarFallback}>{user?.name[0]}</Text>
              )}
            </View>

            <Text style={styles.username}>{user?.name}</Text>
          </TouchableOpacity>

          <NotificationButton
            quantity={accountData?.notifications}
            onPress={() => router.push('/notifications')}
          />
        </View>

        <View style={styles.welcomeAndEyeContainer}>
          <View>
            <Text style={styles.welcomeText}>Bem vindo de volta!</Text>
            <Text style={styles.helloUserText}>Olá, {user?.name.split(' ', 1)[0]}!</Text>
          </View>

          <CircleIconButton
            icon={
              showBalance ? (
                <Eye color={Colors.primary} size={24} />
              ) : (
                <EyeClosed color={Colors.primary} size={24} />
              )
            }
            width={44}
            height={44}
            color={Colors.secondary}
            onPress={() => setShowBalance((prevState) => !prevState)}
            activeOpacity={1}
          />
        </View>
        <View style={styles.cofrinhoBalanceContainer}>
          <View>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
              Saldo no cofrinho
            </Text>
            <MoneyText
              showMoney={showBalance}
              amount={accountData?.balance}
              size={28}
              color="#fff"
            />
          </View>

          <CircleIconButton
            icon={<Plus color={Colors.primary} />}
            color="#fff"
            onPress={() => router.push('/add-funds')}
          />
        </View>

        {hasOpenFinanceConsent && (
          <TouchableOpacity activeOpacity={1} onPress={() => router.push('/total-balance')}>
            <View
              style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={{ color: Colors.primary, fontWeight: 'bold', fontSize: 16 }}>
                Saldo total
              </Text>

              <View>
                {openFinanceData && !loading && (
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    {openFinanceData.logos.map((url, index) => (
                      <LogoItem key={index} url={url} index={index} />
                    ))}
                  </View>
                )}

                <ChevronRight color={Colors.primary} size={24} />
              </View>
            </View>

            {openFinanceData && !loading ? (
              <MoneyText
                showMoney={showBalance}
                amount={openFinanceData.balance}
                color={Colors.black}
                size={28}
              />
            ) : (
              <Animated.View
                style={{
                  width: '100%',
                  height: 30,
                  backgroundColor: Colors.lightGray2,
                  borderRadius: 10,
                  marginTop: 8,
                }}
              />
            )}
          </TouchableOpacity>
        )}

        <OFCard />

        <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <TouchableOpacity
            onPress={() => router.push('/transactions')}
            activeOpacity={1}
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ color: Colors.primary, fontWeight: 'bold', fontSize: 16 }}>
              Entradas e saídas
            </Text>

            <ChevronRight color={Colors.primary} size={24} />
          </TouchableOpacity>

          <Text style={{ color: Colors.lightGray, fontWeight: 'bold', fontSize: 16 }}>
            Últimas transações
          </Text>

          <ScrollView>
            <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {transactions.length === 0 ? (
                <Text style={{ color: Colors.lightGray }}>Nenhuma transação encontrada.</Text>
              ) : (
                transactions.map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    type={transaction.type}
                    value={transaction.value}
                    title={transaction.title}
                  />
                ))
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    gap: 24,
  },
  userAndNotificationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  userAvatarContainer: {
    width: 72,
    height: 72,
    backgroundColor: Colors.lightGray3,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatarFallback: {
    fontSize: 32,
  },
  welcomeText: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.lightGray,
  },
  helloUserText: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.primary,
  },
  welcomeAndEyeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cofrinhoBalanceContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
});
