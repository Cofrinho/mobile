import Button from '@/components/Button';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const institution = {
  id: '1',
  name: 'Nubank',
  logo: 'https://cdn-1.webcatalog.io/catalog/nubank/nubank-icon-filled-256.png?v=1745196590866',
  color: '#831bd1',
};

const account = {
  institutionName: 'Banco do Brasil',
  account: '00458231',
  agency: '1743',
};

export default function BankApp() {
  const router = useRouter();

  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: institution.color, gap: 16 }]}>
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

      <Image source={{ uri: institution.logo }} width={96} height={96} />

      <View
        style={{ width: '100%', backgroundColor: '#fff', padding: 12, borderRadius: 10, gap: 8 }}
      >
        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 4 }}>
          <Image
            source={require('../../assets/images/open-finance.png')}
            style={{ width: 24, height: 24 }}
          />
          <Text style={{ fontWeight: 'bold' }}>Compartilhamento via Open Finance</Text>
        </View>
        <Text>Instituicão: {account.institutionName}</Text>
        <Text>Conta: {account.account}</Text>
        <Text>Agência: {account.agency}</Text>
      </View>

      <Button
        text="COMPARTILHAR DADOS"
        color="#fff"
        textColor="#000"
        onPress={() => router.push('/(open-finance)/link-successfull/${id}')}
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
