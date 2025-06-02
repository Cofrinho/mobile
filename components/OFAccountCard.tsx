import Colors from '@/constants/colors';
import { Image, Text, View } from 'react-native';
import MoneyText from './MoneyText';

type props = {
  logo: string;
  name: string;
  agency: string;
  account: string;
  amount: number;
};

export default function OFAccountCard({ logo, name, agency, account, amount }: props) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 12,
        borderColor: Colors.primary,
        padding: 12,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <View
          style={{ width: 36, height: 36, borderRadius: 100, backgroundColor: Colors.secondary }}
        >
          <Image src={logo} />
        </View>

        <View>
          <Text style={{ fontWeight: 'bold' }}>{name}</Text>

          <Text style={{ color: Colors.lightGray }}>Agência {agency}</Text>
          <Text style={{ color: Colors.lightGray }}>Conta {account}</Text>
        </View>
      </View>

      <MoneyText amount={amount} color={Colors.black} size={16} />
    </View>
  );
}
