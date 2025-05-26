import { Image, StyleSheet } from 'react-native';

export default function Logo() {
  return <Image style={styles.logo} source={require('../assets/images/icon.png')} />;
}

const styles = StyleSheet.create({
  logo: {
    width: 124,
    height: 124,
  },
});
