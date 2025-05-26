import { Image, StyleSheet, Text, View } from 'react-native';

export default function LogoWithTitle() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/images/icon.png')} />
      <Text style={styles.title}>cofrinho.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 124,
    height: 124,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});
