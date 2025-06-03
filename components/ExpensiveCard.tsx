import Colors from '@/constants/colors';
import { ChevronRight, ReceiptText } from 'lucide-react-native'; // Make sure to import these components
import { StyleSheet, Text, View } from 'react-native';

interface ExpensiveCardProps {
  expensive: {
    id: string;
    name: string;
    total: number;
  };
}

export default function ExpensiveCard({ expensive }: ExpensiveCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.subCointainer}>
        <View style={styles.iconContainer}>
          <ReceiptText size={22} color={Colors.primary} />
        </View>
        <View>
          <Text style={styles.title}>{expensive.name}</Text>
          <Text style={styles.subTitle}>Total: R$ {expensive.total.toFixed(2)}</Text>
        </View>
      </View>
      <ChevronRight size={22} color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  iconContainer: {
    backgroundColor: Colors.secondary,
    padding: 8,
    borderRadius: 100,
  },
  subCointainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.lightGray,
  },
  subTitle: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: 'semibold',
  },
});
