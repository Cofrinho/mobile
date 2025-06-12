import AnimatedView from '@/components/AnimatedView';
import Button from '@/components/Button';
import CircleIconButton from '@/components/CircleIconButton';
import ErrorText from '@/components/ErrorText';
import SelectOFAccount from '@/components/SelectAccount';
import Subtitle from '@/components/Subtitle';
import Colors from '@/constants/colors';
import { AuthContext } from '@/contexts/AuthContext';
import institutionService from '@/services/institutions';
import openFinanceService from '@/services/open-finance';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { Undo2 } from 'lucide-react-native';
import { useCallback, useContext, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface account {
  institutionId: number;
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

export default function SelectPaymentAccount() {
  const router = useRouter();

  const { value } = useLocalSearchParams();
  const { user } = useContext(AuthContext);

  const [selectedAccount, setSelectedAccount] = useState(0);

  const amountFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value) / 100);

  const [institutions, setInstitutions] = useState({} as totalBalanceResponse);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [hasAccount, setHasAccount] = useState(false);

  const [account, setAccount] = useState({} as account);
  const [institutionColor, setInstitutionColor] = useState<string>();

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
    <SelectOFAccount
      account={item.account}
      agency={item.agency}
      amount={item.balance}
      logo={item.logo_url}
      name={item.institutionName}
      onPress={() => {
        setSelectedAccount(Number(item.institutionId));
        setAccount(item);
      }}
      selected={selectedAccount == Number(item.institutionId)}
      valueIsMoreThanBalance={Number(value) / 100 > Number(item.balance)}
      disabled={Number(value) / 100 > Number(item.balance)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CircleIconButton
          color={Colors.secondary}
          icon={<Undo2 size={24} color={Colors.primary} />}
          onPress={() => router.push('/(tabs)/add-funds')}
        />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Selecione uma conta para realizar o pagamento</Text>
        </View>
      </View>

      <View style={{ gap: 4, paddingVertical: 24 }}>
        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
          Valor a ser pago
        </Text>
        <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>
          {amountFormatted}
        </Text>
      </View>

      <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Contas conectadas</Text>

      {hasAccount ? (
        <FlatList
          data={institutions.accounts}
          keyExtractor={(item) => item.institutionId.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 12 }}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          showsVerticalScrollIndicator={false}
          style={{ flexGrow: 0 }}
        />
      ) : loading ? (
        <AnimatedView width={'100%'} height={70} marginVertical={12} />
      ) : (
        <View style={{ marginVertical: 12 }}>
          <Subtitle>Nenhuma conta encontrada</Subtitle>
        </View>
      )}

      <Button
        text="PAGAR COM A CONTA SELECIONADA"
        disabled={selectedAccount == 0}
        onPress={() =>
          router.push(
            `/(bank-app)/payment/${account.institutionId}?value=${value}&institutionName=${account.institutionName}&logo=${account.logo_url}&account=${account.account}&agency=${account.agency}&userId=${user?.id}`,
          )
        }
      />

      {selectedAccount == 0 && (
        <View style={{ marginTop: 10 }}>
          <ErrorText text="Selecione uma conta" />
        </View>
      )}
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
    textAlign: 'center',
    width: 200,
  },
});
