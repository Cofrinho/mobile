import Colors from '@/constants/colors';
import { ArrowRight } from 'lucide-react-native';
import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

type props = TouchableOpacityProps & {
  name: string;
  logo: string;
};

export default function OFInstitutionCard({ name, logo, ...props }: props) {
  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 12,
        alignItems: 'center',
      }}
      {...props}
    >
      <View style={{ display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <Image
          source={{
            uri: logo,
          }}
          width={48}
          height={48}
          style={{ borderRadius: 100, objectFit: 'cover' }}
        />
        <Text style={{ fontWeight: 'bold' }}>{name}</Text>
      </View>

      <ArrowRight />
    </TouchableOpacity>
  );
}
