import CircleIconButton from '@/components/CircleIconButton';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { Undo2 } from 'lucide-react-native';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const user = {
  avatar: '',
  name: 'Usuário da Silva',
  email: 'usuario@gmail.com',
};

export default function User() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <CircleIconButton
            color={Colors.secondary}
            icon={<Undo2 size={24} color={Colors.primary} />}
            onPress={() => router.back()}
          />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.userContainer}>
            {user && user.avatar ? (
              <Image src={user.avatar} />
            ) : (
              <View style={styles.avatarContainer}>
                <Text style={styles.usernameAvatar}>{user.name[0]}</Text>
              </View>
            )}

            <View>
              <Text style={styles.username}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  header: {
    position: 'relative',
    height: 48,
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    backgroundColor: Colors.secondary,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameAvatar: {
    fontSize: 32,
  },
  username: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 18,
  },
  userContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  email: {
    fontWeight: '500',
    color: Colors.lightGray,
    textAlign: 'center',
  },
});
