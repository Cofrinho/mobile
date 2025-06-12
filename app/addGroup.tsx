import Button from '@/components/Button';
import CircleIconButton from '@/components/CircleIconButton';
import Input from '@/components/Input';
import Colors from '@/constants/colors';
import { AuthContext } from '@/contexts/AuthContext';
import groupService from '@/services/group';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { ImagePlus, Trash2, Undo2 } from 'lucide-react-native';
import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, { message: 'O campo nome é obrigatório' }).max(40),
  description: z
    .string()
    .max(100, { message: 'A descrição deve ter no máximo 100 caracteres' })
    .optional(),
});

export default function addGroup() {
  const { user } = useContext(AuthContext);
  const [urlDevice, setUrlDevice] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
    },
    mode: 'onTouched',
  });
  const [loading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState('' as string);

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

  const groupRegister = async (data: any) => {
    if (!user) {
      setResponseError('Usuário não autenticado.');
      setLoading(false);
      return;
    }
    const groupData = {
      group_owner: user.id,
      name: data.name,
      description: data.description || '',
      image: urlDevice,
    };
    try {
      setLoading(true);
      await groupService.create(groupData);
      setResponseError('');
      router.back();
    } catch (error: any) {
      console.error('Erro ao criar grupo:', error);
      const apiMessage =
        error?.response?.data?.error ?? error?.message ?? 'Erro inesperado. Tente novamente.';
      setResponseError(apiMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        clearErrors();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors, clearErrors]);

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

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome do grupo"
                onChangeText={onChange}
                value={value}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
                maxLength={40}
                inputMode="text"
                textContentType="name"
                autoComplete="name"
              />
            )}
          />
          {errors.name && (
            <Text style={{ color: 'red', marginLeft: 8, marginBottom: 12 }}>
              {errors.name.message}
            </Text>
          )}

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Descrição do grupo"
                onChangeText={onChange}
                value={value}
                autoCapitalize="sentences"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={() => {}}
                maxLength={100}
                inputMode="text"
                textContentType="name"
                autoComplete="name"
              />
            )}
          />
          {errors.description && (
            <Text style={{ color: 'red', marginLeft: 8, marginBottom: 4 }}>
              {errors.description.message}
            </Text>
          )}

          {responseError && <Text style={{ color: Colors.red }}>{responseError}</Text>}
          <Button text="Criar Grupo" onPress={handleSubmit(groupRegister)} />
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
