import Colors from '@/constants/colors';
import { ChevronRight } from 'lucide-react-native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface GroupCardProps {
  title: string;
  members: number;
  image: string;
  onPress: () => void;
}

export default function GroupCard({ title, members, image, onPress }: GroupCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.members}>{members} Membros</Text>
        </View>
      </View>
      <ChevronRight color={Colors.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 100,
  },
  title: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: 'regular',
  },
  members: {
    fontSize: 12,
    fontWeight: 'semibold',
    color: Colors.lightGray,
  },
});
