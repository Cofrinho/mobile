import Button from '@/components/Button';
import CircleIconButton from '@/components/CircleIconButton';
import OFInstitutionCard from '@/components/OFInstitutionCard';
import RadioButtonGroup from '@/components/RadioButtonGroup';
import Colors from '@/constants/colors';
import { AuthContext } from '@/contexts/AuthContext';
import openFinanceService from '@/services/open-finance';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Undo2 } from 'lucide-react-native';
import { useContext, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const getFormattedDateTime = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // meses são 0-based
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
};

const getFormattedDate = (expiration: number) => {
  const now = new Date();
  const futureDate = new Date(now);
  futureDate.setMonth(futureDate.getMonth() + expiration);

  const day = String(futureDate.getDate()).padStart(2, '0');
  const month = String(futureDate.getMonth() + 1).padStart(2, '0');
  const year = futureDate.getFullYear();

  return `${day}/${month}/${year}`;
};

export default function LinkExpiration() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { id, name, logo } = useLocalSearchParams();

  const [expirationTimeValue, setExpirationTimeValue] = useState('option1');

  const [loading, setLoading] = useState(false);

  const createConsent = async () => {
    try {
      setLoading(true);

      const data = await openFinanceService.createConsent({
        userId: Number(user?.id),
        institutionId: Number(id),
        expirationTime: expirationTimeValue,
      });

      router.push(
        `/(bank-app)/open-finance/${id}?agency=${data.agency}&account=${data.account_number}&institution=${name}&start=${getFormattedDateTime()}&expiration=${expirationTimeValue == '0' ? 'Indeterminado' : getFormattedDate(Number(expirationTimeValue))}`,
      );

      return;
    } catch (error: any) {
      console.log(error.response.data);
      console.log(error.message);
    } finally {
      setLoading((prev) => (prev = false));
    }
  };

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
            source={require('@/assets/images/open-finance.png')}
            style={{ width: 24, height: 24 }}
          />

          <Text style={styles.title}>Open Finance</Text>
        </View>
      </View>

      <View style={{ gap: 16, flex: 1 }}>
        <View style={{ gap: 16 }}>
          <Text style={{ color: Colors.primary, fontWeight: '700' }}>Instituição selecionada</Text>

          <OFInstitutionCard
            logo={logo.toString()}
            id={id.toString()}
            name={name.toString()}
            showIcon={false}
            activeOpacity={1}
          />
        </View>

        <View style={{ gap: 16 }}>
          <Text style={{ color: Colors.primary, fontWeight: '700' }}>Tempo de conexão</Text>

          <RadioButtonGroup
            selected={expirationTimeValue}
            onChange={setExpirationTimeValue}
            options={[
              { label: 'Prazo indeterminado', value: '0' },
              { label: '12 meses', value: '12' },
              { label: '6 meses', value: '6' },
              { label: '3 meses', value: '3' },
            ]}
          />
        </View>
      </View>

      <Button text="CONFIRMAR" disabled={loading} onPress={() => createConsent()} />
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
