import Button from '@/components/Button';
import CircleIconButton from '@/components/CircleIconButton';
import OFInstitutionCard from '@/components/OFInstitutionCard';
import RadioButtonGroup from '@/components/RadioButtonGroup';
import Colors from '@/constants/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Undo2 } from 'lucide-react-native';
import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const institution = {
  id: '2',
  name: 'Itaú',
  logo: 'https://designconceitual.com.br/wp-content/uploads/2023/12/Ita%C3%BA-novo-logotipo-2023-1000x600.jpg',
};

export default function LinkExpiration() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [expirationTimeValue, setExpirationTimeValue] = useState('option1');

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
            source={require('../../../assets/images/open-finance.png')}
            style={{ width: 24, height: 24 }}
          />

          <Text style={styles.title}>Open Finance</Text>
        </View>
      </View>

      <View style={{ gap: 16, flex: 1 }}>
        <View style={{ gap: 16 }}>
          <Text style={{ color: Colors.primary, fontWeight: '700' }}>Instituição selecionada</Text>

          <OFInstitutionCard
            logo={institution.logo}
            id={institution.id}
            name={institution.name}
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

      <Button text="CONFIRMAR" onPress={() => router.push(`/(bank-app)/open-finance/${id}`)} />
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
