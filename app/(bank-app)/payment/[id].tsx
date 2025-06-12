import Button from '@/components/Button';
import ErrorText from '@/components/ErrorText';
import MoneyText from '@/components/MoneyText';
import Colors from '@/constants/colors';
import api from '@/services/api';
import institutionService from '@/services/institutions';
import openFinanceService from '@/services/open-finance';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

export default function BankAppPayment() {
  const router = useRouter();

  const { id, userId, value, institutionName, account, agency, logo } = useLocalSearchParams();

  const [color, setColor] = useState<string>();

  useEffect(() => {
    async function GetInstitutionColor() {
      const institutionColor = (await institutionService.findAll()).find(
        (i) => i.id == Number(id),
      )?.color;
      setColor(institutionColor);
    }
    GetInstitutionColor();
  }, []);

  const [paymentConfirmData, setPaymentConfirmData] = useState();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState();

  const paymentConfirm = async () => {
    try {
      setLoading(true);

      const data = await openFinanceService.confirmPayment({
        userId: Number(userId),
        institutionId: Number(id),
        value: Number(value) / 100,
      });

      setPaymentConfirmData(data);
    } catch (error: any) {
      setError(error.response?.data?.errors || error.message);
      return;
    } finally {
      setTimeout(() => {
        setLoading(false);
        router.push('/add-funds/successfull');
      }, 1500);
    }
  };

  const animation = useRef<LottieView>(null);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color, gap: 16 }]}>
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

      <Image
        source={{ uri: logo.toString() }}
        width={96}
        height={96}
        style={{ borderRadius: 100 }}
      />

      <View
        style={{ width: '100%', backgroundColor: '#fff', padding: 12, borderRadius: 10, gap: 8 }}
      >
        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 4 }}>
          <Image
            source={require('@/assets/images/open-finance.png')}
            style={{ width: 24, height: 24 }}
          />
          <Text style={{ fontWeight: 'bold' }}>Pagamento via Open Finance</Text>
        </View>
        <Text>Instituicão: {institutionName}</Text>
        <Text>Conta: {account}</Text>
        <Text>Agência: {agency}</Text>
        <MoneyText amount={Number(value) / 100} size={16} />
      </View>

      <Button
        text="CONFIRMAR PAGAMENTO"
        color="#fff"
        textColor="#000"
        onPress={() => paymentConfirm()}
        disabled={loading}
      />

      {error && (
        <View style={{ marginTop: 12 }}>
          <ErrorText text={error} />
        </View>
      )}

      {loading && (
        <Modal transparent={true} visible={loading} animationType="fade">
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
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginBottom: 24,
                    marginTop: 8,
                    textAlign: 'center',
                  }}
                >
                  Adicionando saldo no cofrinho
                </Text>

                <LottieView
                  autoPlay
                  loop
                  ref={animation}
                  style={{
                    width: 200,
                    height: 200,
                  }}
                  source={require('@/assets/animations/piggybank.json')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
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
    position: 'relative',
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
