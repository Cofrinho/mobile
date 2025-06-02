import Colors from '@/constants/colors';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { DollarSign, Plus, UsersRound } from 'lucide-react-native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Navbar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const tabs = [
    { name: 'account/index', icon: <DollarSign color={Colors.primary} /> },
    {
      name: 'addFunds/index',
      icon: <Plus color={'#fff'} style={styles.addFundsIcon} width={40} height={40} />,
    },
    { name: 'groups/index', icon: <UsersRound color={Colors.primary} /> },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        {tabs.map((tab, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: state.routes[index].key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(tab.name.split('/')[0]);
            }
          };

          return (
            <TouchableOpacity
              key={tab.name}
              onPress={onPress}
              style={[isFocused ? styles.activeIcon : styles.icon]}
            >
              {tab.icon}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  navbar: {
    width: 160.8,
    height: 52,
    backgroundColor: '#fff',
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 0px 8px 0px, rgba(0, 0, 0, 0.12) 0px 0px 8px 0px',
    marginBottom: 64,
  },
  icon: {
    borderRadius: 30,
    width: 44,
    height: 35,
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIcon: {
    backgroundColor: Colors.secondary,
    borderRadius: 30,
    width: 44,
    height: 35,
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addFundsIcon: {
    backgroundColor: Colors.primary,
    borderRadius: 100,
  },
});
