import Button from '@/components/Button';
import CircleIconButton from '@/components/CircleIconButton';
import Input from '@/components/Input';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { Undo2 } from 'lucide-react-native';
import { Image, StyleSheet, Text, View } from 'react-native';

const user = {
  avatar: '',
  name: 'Usuário da Silva',
  email: 'usuario@gmail.com',
  phone: '(55) 99293-9329',
  birthdate: '22/01/2004',
};

export default function UserEdit() {
  const router = useRouter();

  return (
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

        <View style={{ flex: 1, display: 'flex', width: '100%' }}>
          <View style={{ gap: 4 }}>
            <Text style={styles.label}>Nome</Text>
            <Input placeholder="nome" />
          </View>

          <View style={{ gap: 4 }}>
            <Text style={styles.label}>Email</Text>
            <Input placeholder="email" />
          </View>

          <View style={{ gap: 4 }}>
            <Text style={styles.label}>Celular</Text>
            <Input placeholder="celular" />
          </View>

          <View style={{ gap: 4 }}>
            <Text style={styles.label}>Data de Nascimento</Text>
            <Input placeholder="data de nascimento" />
          </View>
        </View>

        <Button text="CONFIRMAR" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#fff',
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
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
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
  label: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
