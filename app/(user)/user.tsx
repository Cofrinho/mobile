import Button from '@/components/Button';
import CircleIconButton from '@/components/CircleIconButton';
import Colors from '@/constants/colors';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { History, LogOut, Pencil, Trash, Undo2, X } from 'lucide-react-native';
import { useContext, useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function User() {
  const router = useRouter();
  const { logout, user } = useContext(AuthContext);

  const [deleteAccountModal, setDeleteAccountModal] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
            {user && user.avatar_url ? (
              <Image src={user.avatar_url} />
            ) : (
              <View style={styles.avatarContainer}>
                <Text style={styles.usernameAvatar}>{user?.name[0]}</Text>
              </View>
            )}

            <View>
              <Text style={styles.username}>{user?.name}</Text>
              <Text style={styles.email}>{user?.email}</Text>
            </View>
          </View>

          <View style={{ flex: 1, display: 'flex', width: '100%' }}>
            <View>
              <Button
                text="EDITAR PERFIL"
                icon={<Pencil color={'#fff'} size={20} />}
                onPress={() => router.push('/(user)/user-edit')}
              />
            </View>

            <View
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
              }}
            >
              <View style={{ display: 'flex', gap: 8, marginTop: 32 }}>
                <Button
                  text="Open Finance"
                  center={false}
                  uppercase={false}
                  icon={
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={require('@/assets/images/open-finance.png')}
                    />
                  }
                  color={Colors.lightGray2}
                  textColor={Colors.black}
                  onPress={() => router.push('/open-finance')}
                />

                <Button
                  text="Histórico de Recargas"
                  center={false}
                  uppercase={false}
                  icon={<History size={20} />}
                  color={Colors.lightGray2}
                  textColor={Colors.black}
                />
              </View>

              <View style={{ display: 'flex', gap: 8 }}>
                <Button
                  text="Excluir Conta"
                  icon={<Trash size={20} color={Colors.red} />}
                  color={Colors.lightGray2}
                  textColor={Colors.red}
                  onPress={() => setDeleteAccountModal((prevState) => (prevState = !prevState))}
                />

                <Button
                  text="Sair do Aplicativo"
                  icon={<LogOut size={20} />}
                  color={Colors.lightGray2}
                  textColor={Colors.black}
                  onPress={() => {
                    logout();
                    router.push('/(auth)/login');
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      {deleteAccountModal && (
        <Modal
          transparent={true}
          visible={deleteAccountModal}
          onRequestClose={() => {
            setDeleteAccountModal(!deleteAccountModal);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPressOut={() => setDeleteAccountModal(false)}
              style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}
            >
              <View
                style={{
                  width: '80%',
                  height: 'auto',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  padding: 20,
                  borderRadius: 25,
                }}
                onStartShouldSetResponder={() => true}
              >
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}
                >
                  <TouchableOpacity onPress={() => setDeleteAccountModal(false)}>
                    <X color={Colors.primary} />
                  </TouchableOpacity>
                </View>

                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginBottom: 40,
                    marginTop: 8,
                    textAlign: 'center',
                  }}
                >
                  Confirme a exclusão da sua conta
                </Text>

                <View style={{ width: '100%', gap: 8 }}>
                  <Button
                    text="voltar"
                    color={Colors.primary}
                    onPress={() => setDeleteAccountModal(false)}
                  />
                  <Button
                    text="Excluir conta"
                    color={Colors.lightGray2}
                    textColor={Colors.red}
                    onPress={() => setDeleteAccountModal(false)}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
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
});
