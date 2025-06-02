import Colors from '@/constants/colors';
import { ChevronRight } from 'lucide-react-native';
import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

export default function OFCard({ ...props }: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 10,
        height: 58,
        paddingHorizontal: 12,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ display: 'flex', alignItems: 'center', gap: 4, flexDirection: 'row' }}>
          <Image
            source={require('../assets/images/open-finance.png')}
            style={{ width: 24, height: 24 }}
          />

          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Open Finance</Text>
        </View>

        <ChevronRight color={Colors.primary} size={24} />
      </View>
    </TouchableOpacity>
  );
}
