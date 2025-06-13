import Colors from '@/constants/colors';
import { BanknoteArrowDown, BanknoteArrowUp, HandCoins, PiggyBank } from 'lucide-react-native';

export function getTransactionIconAndColor(type: string) {
  switch (type) {
    case 'RECHARGE':
      return {
        icon: <BanknoteArrowDown color={Colors.green} />,
        color: Colors.green,
        prefix: '+',
      };
    case 'TRANSACTION':
      return {
        icon: <BanknoteArrowUp color={Colors.primary} />,
        color: Colors.primary,
        prefix: '-',
      };
    case 'EXPENSE':
      return {
        icon: <PiggyBank color={Colors.black} />,
        color: Colors.black,
        prefix: '',
      };
    case 'PAYMENT':
      return {
        icon: <HandCoins color={Colors.red} />,
        color: Colors.red,
        prefix: '-',
      };
    default:
      return {
        icon: null,
        color: Colors.black,
        prefix: '',
      };
  }
}
