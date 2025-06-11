import Button from '@/components/Button';
import CircleIconButton from '@/components/CircleIconButton';
import Input from '@/components/Input';
import Colors from '@/constants/colors';
import groupService from '@/services/group';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Undo2 } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

interface Group {
  id: number;
  name: string;
  description: string;
  access_code: string;
  image_url: string | null;
  group_owner: number;
  balance: string;
  expenses: Array<{
    id: string;
    name: string;
    total: number;
    created_at: string;
    updated_at: string;
    group_id: number;
    user_id: number;
  }>;
  participants: Array<{
    id: number;
    name: string;
    email: string;
    avatar_url: string | null;
    created_at: string;
    updated_at: string;
  }>;
}

export default function EditGroup() {
  const router = useRouter();
  const { id } = useLocalSearchParams() as { id: string };
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState('' as string);

  const schema = z.object({
    name: z
      .string()
      .nonempty({ message: 'O campo nome é obrigatório' })
      .min(2, { message: 'O campo nome deve ter no minimo 2 caracteres' })
      .max(40),
    description: z
      .string()
      .max(100, { message: 'A descrição deve ter no máximo 100 caracteres' })
      .optional(),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    clearErrors,
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!id) {
      router.replace('/(tabs)/groups');
    }
    const fetchGroup = async () => {
      try {
        setLoading(true);
        const response = await groupService.getById(id);
        setGroup(response);
        reset({
          name: response.name,
          description: response.description,
        });
      } catch (error) {
        console.error('Error fetching groups:', error);
        setGroup(null);
      } finally {
        setLoading(false);
      }
    };
    fetchGroup();
  }, [id, router]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        clearErrors();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors, clearErrors]);

  const onUpdate = async (data: any) => {
    if (!group) {
      console.error('Grupo não encontrado');
      return;
    }
    const groupData = {
      name: data.name,
      description: data.description || '',
    };
    try {
      setLoading(true);
      await groupService.update(id.toString(), groupData);
      router.back();
    } catch (error: any) {
      const apiMessage =
        error?.response?.data?.error ?? error?.message ?? 'Erro inesperado. Tente novamente.';
      console.error('Erro ao atualizar grupo:', error);
      setResponseError(apiMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Carregando...</Text>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <CircleIconButton
              color={Colors.secondary}
              icon={<Undo2 size={24} color={Colors.primary} />}
              onPress={() => router.back()}
            />
          </View>

          <View style={styles.contentContainer}>
            <Image
              source={{
                uri: group?.image_url || 'https://i.pravatar.cc/100?img=1',
              }}
              style={styles.groupImage}
            />

            <View style={{ width: '100%' }}>
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
            </View>

            <View style={{ width: '100%' }}>
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
            </View>

            {responseError && <Text style={{ color: Colors.red }}>{responseError}</Text>}
            <Button text="Atualizar" onPress={handleSubmit(onUpdate)} />
          </View>
        </>
      )}
    </SafeAreaView>
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
  groupImage: {
    width: 90,
    height: 90,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
});
