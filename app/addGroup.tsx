import Button from '@/components/Button';
import CircleIconButton from '@/components/CircleIconButton';
import Input from '@/components/Input';
import Colors from '@/constants/colors';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { ImagePlus, Trash2, Undo2 } from 'lucide-react-native';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function addGroup() {
  const [urlDevice, setUrlDevice] = useState('');

  async function buscaNaGaleria() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const path = result.assets[0].uri;
      setUrlDevice(path);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <CircleIconButton
            color={Colors.secondary}
            icon={<Undo2 size={24} color={Colors.primary} />}
            onPress={() => router.back()}
          />
          <Text style={styles.title}>Criar Grupo</Text>
        </View>
        <View style={styles.form}>
          {urlDevice === '' && <Text style={styles.imageLabel}>Selecione uma imagem</Text>}
          <TouchableOpacity
            onPress={buscaNaGaleria}
            style={{ alignSelf: 'center', marginBottom: 20 }}
          >
            <View style={{ position: 'relative' }}>
              {urlDevice !== '' ? (
                <>
                  <Image
                    style={styles.image}
                    source={{ uri: urlDevice }}
                    loadingIndicatorSource={{ uri: urlDevice }}
                  />
                  <View style={styles.trashButton}>
                    <CircleIconButton
                      icon={<Trash2 size={18} color={Colors.primary} />}
                      color="#FFFFFF"
                      onPress={() => setUrlDevice('')}
                      border={true}
                    />
                  </View>
                </>
              ) : (
                <View style={styles.image}>
                  <ImagePlus color={Colors.primary} size={80} />
                </View>
              )}
            </View>
          </TouchableOpacity>

          <Input
            placeholder="Nome do grupo"
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => {}}
          />
          <Input
            placeholder="Descrição do grupo"
            autoCapitalize="sentences"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={() => {}}
          />
          <Button
            text="Criar Grupo"
            onPress={() => {
              console.log('Grupo criado');
              router.push('/(tabs)/groups');
            }}
          />
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
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    zIndex: -1,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLabel: {
    textAlign: 'center',
    marginBottom: 10,
    color: Colors.lightGray,
    fontSize: 16,
    fontWeight: '600',
  },
  trashButton: {
    position: 'absolute',
    top: 85,
    right: 0,
    zIndex: 2,
  },
});
