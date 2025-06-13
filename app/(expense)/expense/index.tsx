import Button from '@/components/Button';
import MoneyText from '@/components/MoneyText';
import Colors from '@/constants/colors';
import { Expense, ExpenseService } from '@/services/expense';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar, ReceiptText, Undo2 } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ExpenseDetail() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(1);

  const { id, groupId } = useLocalSearchParams();

  const [expense, setExpense] = useState<Expense>();
  const [expenseMembers, setExpenseMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      async function fetchExpenseDetails() {
        const data = await ExpenseService.getExpenseDetails(Number(groupId), id.toString());
        setExpense(data);
      }
      fetchExpenseDetails();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      if (activeTab !== 2) return;
      async function fetchExpenseMembers() {
        try {
          setLoading(true);
          const data = await ExpenseService.getExpenseMembers(Number(groupId), id.toString());
          setExpenseMembers(data);
        } catch (error) {
          console.error('Erro ao buscar membros da despesa:', error);
        } finally {
          setLoading(false);
        }
      }
      fetchExpenseMembers();
    }, [activeTab]),
  );

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.memberCard}>
      <Image
        source={{
          uri: item?.User?.avatar_url ? item?.User?.avatar_url : 'https://i.sstatic.net/l60Hf.png',
        }}
        style={styles.memberCardAvatar}
      />
      <View>
        <Text style={styles.memberCardTitle}>{item?.User?.name}</Text>
        <Text style={styles.memberCardSubTitle}>
          Total R$: <MoneyText amount={item?.amount} size={12} /> • {item?.percentage_paid}%
        </Text>
      </View>
      <View style={{ marginLeft: 'auto' }}>
        <View
          style={{
            backgroundColor: item?.status === 'PENDING' ? Colors.secondary : Colors.green,
            borderRadius: 100,
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderWidth: 1,
            borderColor: item?.status === 'PENDING' ? Colors.primary : Colors.green,
          }}
        >
          <Text
            style={{
              color: item?.status === 'PENDING' ? Colors.primary : Colors.green,
              fontWeight: 'semibold',
              fontSize: 9,
            }}
          >
            {item?.status === 'PENDING' ? 'PENDENTE' : 'PAGO'}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 12,
        gap: 16,
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          backgroundColor: Colors.secondary,
          borderRadius: 100,
          padding: 8,
          width: 44,
          height: 44,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Undo2 color={Colors.primary} />
      </TouchableOpacity>

      <View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, marginRight: 4 }}>
            <TouchableOpacity
              style={[
                activeTab == 1 ? { borderBottomWidth: 2, borderBottomColor: Colors.primary } : null,
              ]}
              onPress={() => setActiveTab(1)}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Despesa</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, marginLeft: 4 }}>
            <TouchableOpacity
              style={[
                activeTab == 2 ? { borderBottomWidth: 2, borderBottomColor: Colors.primary } : null,
              ]}
              onPress={() => setActiveTab(2)}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Pagamentos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {activeTab === 1 && (
        <View style={{ paddingBottom: 16 }}>
          <View style={{ gap: 24 }}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  backgroundColor: Colors.secondary,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 44,
                  height: 44,
                  marginRight: 12,
                }}
              >
                <ReceiptText color={Colors.primary} />
              </View>

              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>{expense?.name}</Text>

                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: Colors.primary,
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 100,
                      backgroundColor: Colors.secondary,
                    }}
                  >
                    <Text style={{ color: Colors.primary, fontWeight: '500', fontSize: 12 }}>
                      {expense?.status}
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    color: Colors.lightGray,
                    fontWeight: 'bold',
                    flexWrap: 'wrap',
                  }}
                >
                  {expense?.description}
                </Text>
              </View>
            </View>

            <View style={{ gap: 8 }}>
              <Text style={{ color: Colors.primary, fontWeight: 'bold', marginBottom: 4 }}>
                Valor total
              </Text>

              <MoneyText size={30} amount={expense?.value} />

              <View style={{ gap: 4 }}>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: Colors.lightGray2,
                    height: 20,
                    borderRadius: 100,
                  }}
                >
                  {expense?.balance != 0 && (
                    <View
                      style={{
                        width: `${(Number(expense?.balance) / Number(expense?.value)) * 100}%`,
                        backgroundColor: Colors.primary,
                        height: 20,
                        borderTopStartRadius: 100,
                        borderEndStartRadius: 100,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingEnd: 4,
                      }}
                    ></View>
                  )}
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 1, alignItems: 'flex-start' }}>
                    <MoneyText amount={expense?.balance} size={14} />
                  </View>

                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold' }}>
                      {(Number(expense?.balance) / Number(expense?.value)) * 100}%
                    </Text>
                  </View>

                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <MoneyText amount={expense?.value} size={14} />
                  </View>
                </View>
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
                  {expense?.dueDate}
                </Text>
              </View>
            </View>

            <Button text="PAGAR DESPESA" />
          </View>
        </View>
      )}

      {activeTab == 2 && (
        <View>
          <FlatList
            data={expenseMembers}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={
              !loading
                ? () => (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>
                      Nenhum membro encontrado
                    </Text>
                  )
                : null
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  memberCardAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  memberCardTitle: {
    color: Colors.lightGray,
    fontWeight: 'bold',
    fontSize: 16,
  },
  memberCardSubTitle: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
});
