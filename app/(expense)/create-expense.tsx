import Button from '@/components/Button';
import CircleIconButton from '@/components/CircleIconButton';
import Input from '@/components/Input';
import MoneyText from '@/components/MoneyText';
import Stepper from '@/components/Stepper';
import Colors from '@/constants/colors';
import { CreateExpense, ExpenseService, GroupParticipants } from '@/services/expense';
import groupService from '@/services/group';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar, Check, ChevronDown, ChevronUp, ReceiptText, Undo2 } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CreateExpenseScreen() {
  const router = useRouter();
  const { groupId } = useLocalSearchParams();

  const [step, setStep] = useState(1);

  const [participants, setParticipants] = useState<GroupParticipants[]>([]);

  // form
  const { setValue, handleSubmit, register, watch, control } = useForm<CreateExpense>();

  const name = watch('name');
  const description = watch('description');
  const value = watch('value');
  const dueDate = watch('dueDate');

  useFocusEffect(
    useCallback(() => {
      async function fetchGroupParticipants() {
        const groupParticipants = await groupService.getMembers(groupId.toString());
        setParticipants(groupParticipants);
      }
      fetchGroupParticipants();
    }, []),
  );

  // form submit function
  const onSubmit = async (data: CreateExpense) => {
    const members = participants.map((p) => ({
      userId: p.id,
      percentagePaid: parseFloat((100 / participants.length).toFixed(2)),
      amount:
        p.id == participants[0].id
          ? parseFloat(
              (
                parseFloat((Number(value) / participants.length).toFixed(2)) +
                (Number(value) -
                  parseFloat((Number(value) / participants.length).toFixed(2)) *
                    participants.length)
              ).toFixed(2),
            )
          : parseFloat((Number(value) / participants.length).toFixed(2)),
    }));

    data.participants = members;
    data.value = Number(value);

    try {
      const response = await ExpenseService.createExpense(Number(groupId), data);
      router.push(`/group?id=${groupId}`);
    } catch (error: any) {
      console.log(error.response.data);
      console.log(error.message);
    }
  };

  const renderItem = ({ item }: { item: GroupParticipants }) => {
    const isSelected = true;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {}}
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 10,
          borderColor: Colors.primary,
          backgroundColor: isSelected ? Colors.secondary : '#fff',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          {item.avatar ? (
            <Image
              source={{ uri: item.avatar }}
              style={{
                backgroundColor: Colors.secondary,
                width: 44,
                height: 44,
                borderRadius: 100,
              }}
            />
          ) : (
            <View
              style={{
                width: 44,
                height: 44,
                backgroundColor: Colors.lightGray2,
                borderRadius: 100,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name[0]}</Text>
            </View>
          )}
          <Text style={{ color: Colors.primary, fontWeight: '500' }}>{item.name}</Text>
        </View>

        {isSelected && <Check size={22} color={Colors.primary} />}
      </TouchableOpacity>
    );
  };

  const renderItemTwo = ({ item }: { item: GroupParticipants }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 10,
          borderColor: Colors.primary,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <Image
            source={{ uri: item.avatar }}
            style={{
              backgroundColor: Colors.secondary,
              width: 44,
              height: 44,
              borderRadius: 100,
            }}
          />
          <View>
            <Text style={{ color: Colors.primary, fontWeight: '500' }}>{item.name}</Text>

            {item.id == participants[0].id ? (
              <MoneyText
                size={12}
                amount={
                  parseFloat((Number(value) / participants.length).toFixed(2)) +
                  (Number(value) -
                    parseFloat((Number(value) / participants.length).toFixed(2)) *
                      participants.length)
                }
              />
            ) : (
              <MoneyText
                size={12}
                amount={parseFloat((Number(value) / participants.length).toFixed(2))}
              />
            )}
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 32 }}>
          <View style={{ flexDirection: 'row', width: 64, gap: 4 }}>
            <Input
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                borderBottomWidth: 1,
                borderBottomColor: Colors.primary,
                textAlign: 'center',
              }}
              defaultValue={(100 / participants.length).toFixed(2)}
              inputMode="text"
            />

            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>%</Text>
          </View>

          <View>
            <TouchableOpacity>
              <ChevronUp />
            </TouchableOpacity>

            <TouchableOpacity>
              <ChevronDown />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CircleIconButton
          color={Colors.secondary}
          icon={<Undo2 size={24} color={Colors.primary} />}
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Criar Despesa</Text>
      </View>

      {step == 1 && (
        <View style={{ flex: 1 }}>
          <View style={{ gap: 12, flexGrow: 1, flexShrink: 1 }}>
            <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Insira os dados</Text>
            <View>
              <Input
                placeholder="Nome da despesa"
                onChangeText={(text) => setValue('name', text)}
                {...register('name')}
              />
              <Input
                placeholder="Descrição da despesa"
                onChangeText={(text) => setValue('description', text)}
                {...register('description')}
              />
              <Input
                placeholder="Valor total"
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  const filtered = text.replace(/,/g, '');
                  setValue('value', filtered);
                }}
                {...register('value')}
              />
              <Controller
                control={control}
                name="dueDate"
                render={({ field: { onChange, value } }) => {
                  const [show, setShow] = useState(false);

                  const handleChange = (event: any, selectedDate?: Date) => {
                    setShow(false);
                    if (selectedDate) {
                      onChange(selectedDate.toISOString());
                    }
                  };

                  return (
                    <View style={styles.dateContainer}>
                      <Pressable onPress={() => setShow(true)} style={styles.input}>
                        <Text
                          style={{
                            color: value ? '#000' : Colors.lightGray,
                            fontSize: 16,
                            fontWeight: '500',
                          }}
                        >
                          {value
                            ? new Date(value).toLocaleDateString('pt-BR')
                            : 'Data de Vencimento'}
                        </Text>
                      </Pressable>

                      {show && (
                        <DateTimePicker
                          value={value ? new Date(value) : new Date()}
                          mode="date"
                          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                          onChange={handleChange}
                          minimumDate={new Date()}
                        />
                      )}
                    </View>
                  );
                }}
              />
            </View>

            <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Participantes</Text>

            <FlatList
              data={participants}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ gap: 12 }}
            />
          </View>

          <View style={{ gap: 16, paddingTop: 16 }}>
            <View style={{ flexDirection: 'row', gap: 4, justifyContent: 'center' }}>
              <Stepper active={true} />
              <Stepper active={false} />
            </View>

            <Button text="PROSSEGUIR" onPress={() => setStep(2)} />
          </View>
        </View>
      )}

      {step == 2 && (
        <View style={{ flex: 1 }}>
          <View style={{ gap: 12, flexGrow: 1, flexShrink: 1 }}>
            <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Despesa</Text>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View
                style={{
                  backgroundColor: Colors.secondary,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 44,
                  height: 44,
                  flexShrink: 0,
                }}
              >
                <ReceiptText color={Colors.primary} />
              </View>

              <View style={{ flex: 1, gap: 4 }}>
                <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>{name}</Text>

                <Text style={{ color: Colors.lightGray, fontWeight: 'bold' }}>{description}</Text>
              </View>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderColor: Colors.lightGray2,
                borderRadius: 10,
                padding: 8,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.secondary,
                  borderRadius: 100,
                  width: 36,
                  height: 36,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Calendar color={Colors.primary} size={20} />
              </View>

              <View>
                <Text style={{ color: Colors.lightGray, fontWeight: 'bold', fontSize: 12 }}>
                  Vencimento
                </Text>
                <Text style={{ color: Colors.primary, fontWeight: 'bold', fontSize: 12 }}>
                  {new Date(dueDate).toLocaleString().split(',')[0]}
                </Text>
              </View>
            </View>

            <View style={{ gap: 4 }}>
              <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Valor total</Text>
              <MoneyText amount={Number(value)} size={20} />
            </View>

            <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Participantes</Text>

            <FlatList
              data={participants}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItemTwo}
              contentContainerStyle={{ gap: 12 }}
            />
          </View>

          <View style={{ gap: 16, paddingTop: 16 }}>
            <View style={{ flexDirection: 'row', gap: 4, justifyContent: 'center' }}>
              <Stepper active={false} />
              <Stepper active={true} />
            </View>

            <Button text="PROSSEGUIR" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    zIndex: -2,
    backgroundColor: '#fff',
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
    zIndex: -1,
    fontSize: 16,
  },
  dateContainer: {
    width: '100%',
    position: 'relative',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: '500',
    width: '100%',
    padding: 14,
    paddingRight: 80,
    backgroundColor: 'transparent',
  },
});
