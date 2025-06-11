import Colors from '@/constants/colors';
import { ArrowRight } from 'lucide-react-native';
import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

type props = TouchableOpacityProps & {
  name: string;
  logo: string;
  showIcon?: boolean;
  alreadyLinked?: boolean;
};

export default function OFInstitutionCard({
  name,
  logo,
  showIcon = true,
  alreadyLinked,
  ...props
}: props) {
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
      disabled={alreadyLinked}
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
        <View>
          <Text style={{ fontWeight: 'bold' }}>{name}</Text>
          {alreadyLinked && (
            <Text style={{ fontWeight: 'semibold', color: Colors.primary }}>
              Instituição já conectada
            </Text>
          )}
        </View>
      </View>

      {showIcon && <ArrowRight />}
    </TouchableOpacity>
  );
}
