import Button from '@/components/Button';
import CircleIconButton from '@/components/CircleIconButton';
import RequestErrorText from '@/components/RequestErrorText';
import Colors from '@/constants/colors';
import { AuthContext } from '@/contexts/AuthContext';
import institutionService from '@/services/institutions';
import openFinanceService from '@/services/open-finance';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Undo2, X } from 'lucide-react-native';
import { useContext, useEffect, useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LinkSuccessfull() {
  const router = useRouter();
  const { id, logo, institution, expiration, start } = useLocalSearchParams();

  const { user } = useContext(AuthContext);

  const [linkCancelModal, setLinkCancelModal] = useState(false);

  const [expirationTimeValue, setExpirationTimeValue] = useState('option1');

  const [consentData, setConsentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [consentId, setConsentId] = useState<number>();

  useEffect(() => {
    async function fetchConsentId() {
      try {
        const institutionsData = await institutionService.findAll();

        const institutionId = institutionsData.find((item) => item.name == institution)?.id;

        const data = await openFinanceService.getAllConsents(user?.id);
        const consId = data.find((consent) => consent.institution_id == institutionId)?.id;
        setConsentId(consId);
      } catch (error: any) {
        setError(error.message);
      }
    }

    fetchConsentId();
  }, []);

  const revokeConsent = async () => {
    try {
      await openFinanceService.revokeConsent(consentId);
    } catch (error: any) {
      setError(error.response.data.error);
    } finally {
      setLinkCancelModal(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CircleIconButton
          color={Colors.secondary}
          icon={<Undo2 size={24} color={Colors.primary} />}
          onPress={() => router.back()}
        />

        <View style={styles.titleContainer}>
          <Image
            source={require('../../../assets/images/open-finance.png')}
            style={{ width: 24, height: 24 }}
          />

          <Text style={styles.title}>Open Finance</Text>
        </View>
      </View>

      <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 6 }}>
        <Image
          source={{ uri: logo.toString() }}
          width={64}
          height={64}
          style={{ borderRadius: 100 }}
        />
        <Text style={{ fontWeight: 'bold' }}>{institution}</Text>
      </View>

      <View style={{ gap: 16, flex: 1, marginTop: 40 }}>
        <View style={{ gap: 4 }}>
          <Text style={{ color: Colors.primary, fontWeight: '700' }}>
            Início do compartilhamento
          </Text>
          <Text style={{ fontWeight: 'bold' }}>{start}</Text>
        </View>

        <View style={{ gap: 4 }}>
          <Text style={{ color: Colors.primary, fontWeight: '700' }}>Dados expiram em</Text>
          <Text style={{ fontWeight: 'bold' }}>
            {expiration === null || expiration == 'null' ? 'Indeterminado' : expiration}
          </Text>

          {error && <RequestErrorText text={error} />}
        </View>
      </View>

      <Button
        text="CANCELAR COMPARTILHAMENTO"
        color={Colors.red}
        onPress={() => setLinkCancelModal(true)}
      />

      {linkCancelModal && (
        <Modal
          transparent={true}
          visible={linkCancelModal}
          onRequestClose={() => {
            setLinkCancelModal(!linkCancelModal);
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
              onPressOut={() => setLinkCancelModal(false)}
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
                  <TouchableOpacity onPress={() => setLinkCancelModal(false)}>
                    <X color={Colors.primary} />
                  </TouchableOpacity>
                </View>

                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginBottom: 40,
                    marginTop: 8,
                    textAlign: 'center',
                  }}
                >
                  Confirme o cancelamento
                </Text>

                <View style={{ width: '100%', gap: 8 }}>
                  <Button
                    text="voltar"
                    color={Colors.primary}
                    onPress={() => setLinkCancelModal(false)}
                  />
                  <Button
                    text="Cancelar"
                    color={Colors.lightGray2}
                    textColor={Colors.red}
                    onPress={() => revokeConsent()}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#fff',
    zIndex: -2,
  },
  header: {
    position: 'relative',
    height: 48,
    justifyContent: 'center',
    marginBottom: 12,
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 16,
    zIndex: -1,
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginLeft: 8,
  },
});
