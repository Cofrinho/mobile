import { Text, TextProps } from 'react-native';

type props = TextProps & {
  amount: number;
  color: string;
  size: number;
};

export default function MoneyText({ amount, color, size }: props) {
  const amountFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);

  return (
    <Text style={{ color: color, fontSize: size, fontWeight: 'bold' }}>{amountFormatted}</Text>
  );
}
