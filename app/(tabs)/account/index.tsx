import CircleIconButton from '@/components/CircleIconButton';
import MoneyText from '@/components/MoneyText';
import NotificationButton from '@/components/NotificationButton';
import OFCard from '@/components/OFCard';
import TransactionCard from '@/components/TransactionCard';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { ChevronRight, Eye, EyeClosed, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const user = {
  avatar: '',
  name: 'Usuário da Silva',
  cofrinhoBalance: 1349,
  openFinanceBalance: 3412,
};

export default function Page() {
  const router = useRouter();

  const [showBalance, setShowBalance] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.userAndNotificationContainer}>
        <View style={styles.userContainer}>
          <View style={styles.userAvatarContainer}>
            {user.avatar ? (
              <Image src={user.avatar} />
            ) : (
              <Text style={styles.avatarFallback}>{user.name[0]}</Text>
            )}
          </View>

          <Text style={styles.username}>{user.name}</Text>
        </View>

        <NotificationButton quantity={4} onPress={() => router.push('/notifications')} />
      </View>

      <View style={styles.welcomeAndEyeContainer}>
        <View>
          <Text style={styles.welcomeText}>Bem vindo de volta!</Text>
          <Text style={styles.helloUserText}>Olá, {user.name.split(' ', 1)[0]}!</Text>
        </View>

        <CircleIconButton
          icon={
            showBalance ? (
              <Eye color={Colors.primary} size={24} />
            ) : (
              <EyeClosed color={Colors.primary} size={24} />
            )
          }
          width={44}
          height={44}
          color={Colors.secondary}
          onPress={() => setShowBalance((prevState) => !prevState)}
          activeOpacity={1}
        />
      </View>

      <View style={styles.cofrinhoBalanceContainer}>
        <View style={{ gap: 2 }}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Saldo no cofrinho</Text>
          <MoneyText showMoney={showBalance} amount={user.cofrinhoBalance} size={28} color="#fff" />
        </View>

        <CircleIconButton icon={<Plus color={Colors.primary} />} color="#fff" />
      </View>

      <TouchableOpacity activeOpacity={1} onPress={() => router.push('/total-balance')}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: Colors.primary, fontWeight: 'bold', fontSize: 16 }}>
            Saldo total
          </Text>

          <View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  backgroundColor: '#ff6200',
                  width: 24,
                  height: 24,
                  borderRadius: 100,
                  position: 'absolute',
                  right: 48,
                }}
              ></View>
              <View
                style={{
                  backgroundColor: '#9e01db',
                  width: 24,
                  height: 24,
                  borderRadius: 100,
                  position: 'absolute',
                  right: 36,
                }}
              ></View>
              <View
                style={{
                  backgroundColor: '#60b039',
                  width: 24,
                  height: 24,
                  borderRadius: 100,
                  position: 'absolute',
                  right: 24,
                }}
              ></View>
            </View>

            <ChevronRight color={Colors.primary} size={24} />
          </View>
        </View>

        <MoneyText
          showMoney={showBalance}
          amount={user.openFinanceBalance}
          color={Colors.black}
          size={28}
        />
      </TouchableOpacity>

      <OFCard />

      <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <TouchableOpacity
          onPress={() => router.push('/transactions')}
          activeOpacity={1}
          style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <Text style={{ color: Colors.primary, fontWeight: 'bold', fontSize: 16 }}>
            Entradas e saídas
          </Text>

          <ChevronRight color={Colors.primary} size={24} />
        </TouchableOpacity>

        <Text style={{ color: Colors.lightGray, fontWeight: 'bold', fontSize: 16 }}>
          Últimas transações
        </Text>

        <ScrollView>
          <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <TransactionCard operation="in" value={40} title="Recarga Cofrinho" />
            <TransactionCard operation="out" value={40} title="Recarga Cofrinho" />
            <TransactionCard operation="in" value={40} title="Recarga Cofrinho" />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    gap: 24,
  },
  userAndNotificationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  userAvatarContainer: {
    width: 72,
    height: 72,
    backgroundColor: Colors.lightGray3,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatarFallback: {
    fontSize: 32,
  },
  welcomeText: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.lightGray,
  },
  helloUserText: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.primary,
  },
  welcomeAndEyeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cofrinhoBalanceContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
});
