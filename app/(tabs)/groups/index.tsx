import Button from '@/components/Button';
import CircleIconButton from '@/components/CircleIconButton';
import GroupCard from '@/components/GroupCard';
import Input from '@/components/Input';
import Colors from '@/constants/colors';
import { AuthContext } from '@/contexts/AuthContext';
import groupService from '@/services/group';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, useFocusEffect } from 'expo-router';
import { Plus, X } from 'lucide-react-native';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

interface Group {
  group: {
    id: string;
    name: string;
    image_url?: string;
  };
  participants?: Array<{
    id: string;
    user_id: string;
  }>;
}

export default function Groups() {
  const { user } = useContext(AuthContext);
  const [groups, setGroups] = useState<Group[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState('' as string);

  const schema = z.object({
    accessCodeGroup: z
      .string()
      .nonempty('O código do grupo é obrigatório')
      .min(4, 'O código do grupo deve ter 4 caracteres.')
      .max(4, 'O código do grupo deve ter 4 caracteres.'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      accessCodeGroup: '',
    },
  });

  const onSubmit = async (data: { accessCodeGroup: string }) => {
    if (!user) {
      console.error('Usuário não autenticado.');
      return;
    }
    try {
      setLoading(true);
      await groupService.joinGroup(data.accessCodeGroup);
      setModalVisible(false);
      const response = await groupService.getAllByUser(user.id);
      setGroups(response);
    } catch (error: any) {
      if (error?.status === 404) {
        setResponseError('Grupo não encontrado ou código inválido.');
      }
      if (
        error?.status === 400 &&
        error.response?.data?.error == 'User is already an active participant in this group.'
      ) {
        setResponseError('Você já está no grupo informado.');
      }
      console.error('Erro ao entrar no grupo:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchGroups = async () => {
        setLoading(true);
        try {
          if (!user) {
            console.error('Usuário não autenticado.');
            setGroups([]);
            return;
          }
          const response = await groupService.getAllByUser(user.id);
          setGroups(response);
        } catch (error) {
          console.error('Error fetching groups:', error);
          setGroups([]);
        } finally {
          setLoading(false);
        }
      };
      fetchGroups();
    }, [user]),
  );

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        clearErrors();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors, clearErrors]);

  useEffect(() => {
    if (responseError) {
      const timer = setTimeout(() => {
        setResponseError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [responseError]);

  const renderItem = ({ item }: { item: Group }) => {
    return (
      <GroupCard
        title={item.group.name}
        members={item.participants?.length ?? 0}
        image={
          item.group.image_url
            ? item.group.image_url
            : 'https://peqengenhariajr.com.br/wp-content/uploads/2021/03/dinamica-de-grupo.jpg'
        }
        onPress={() => router.push({ pathname: '/group', params: { id: item.group.id } })}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 16,
          }}
        >
          <Text style={styles.title}>Grupos</Text>
          <CircleIconButton
            icon={<Plus color="#FFFFFF" />}
            color={Colors.primary}
            border={false}
            onPress={() => router.push('/addGroup')}
          />
        </View>
        {loading ? (
          <Text>Carregando grupos...</Text>
        ) : groups.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Você ainda não está em nenhum grupo. Crie ou entre em um grupo!
          </Text>
        ) : (
          <FlatList
            data={groups}
            keyExtractor={(item) => item.group.id}
            renderItem={renderItem}
            contentContainerStyle={{ gap: 4 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <Button text="Entrar em um grupo" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
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
            onPressOut={() => setModalVisible(false)}
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
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <X color={Colors.primary} />
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 40 }}>
                Entrar em um grupo
              </Text>
              <Controller
                control={control}
                name="accessCodeGroup"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Código do grupo"
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="characters"
                    autoCorrect={false}
                    keyboardType="default"
                    textContentType="none"
                    autoComplete="off"
                    inputMode="text"
                  />
                )}
              />
              {errors.accessCodeGroup && (
                <Text style={{ color: 'red', marginLeft: 8, marginBottom: 12 }}>
                  {errors.accessCodeGroup.message}
                </Text>
              )}
              {responseError && (
                <Text style={{ color: Colors.red, marginLeft: 8, marginBottom: 12 }}>
                  {responseError}
                </Text>
              )}
              <Button text="Entrar" onPress={handleSubmit(onSubmit)} />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  subcontainer: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
  },
});
