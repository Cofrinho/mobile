import { Text, TextProps } from 'react-native';

type props = TextProps & {
  amount: number;
  color?: string;
  size: number;
  showMoney?: boolean;
};

export default function MoneyText({ amount, color, size, showMoney = true }: props) {
  const amountFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);

  return (
    <Text style={{ color: color, fontSize: size, fontWeight: 'bold' }}>
      {showMoney ? amountFormatted : '••••'}
    </Text>
  );
}
