import CircleIconButton from '@/components/CircleIconButton';
import Colors from '@/constants/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ClipboardPaste, Key, QrCode, Undo2 } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as Clipboard from 'expo-clipboard';
import Button from '@/components/Button';
import { ExpenseService } from '@/services/expense';

export default function ExpensePayment() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [paymentMode, setPaymentMode] = useState<number>();
  const [pixKey, setPixKey] = useState<string>('');

  useEffect(() => {
    if (!permission || !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  async function handlePasteClipboard() {
    const content = await Clipboard.getStringAsync();
    setPixKey(content);
  }

  function handlePixPayment() {
    console.log('Chave Pix:', pixKey);
    Keyboard.dismiss();
  }

  async function handlePayment() {
    try {
      const data = await ExpenseService.createExpensePayment(id.toString());

      router.push('/(tabs)/groups');
    } catch (error: any) {
      console.error(error.response.data);
      console.error(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CircleIconButton
          color={Colors.secondary}
          icon={<Undo2 size={24} color={Colors.primary} />}
          onPress={() => router.push('/(tabs)/groups')}
        />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Pagamento da despesa</Text>
        </View>
      </View>

      <View style={{ gap: 12 }}>
        <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>
          Selecione a forma de pagamento
        </Text>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            {
              backgroundColor: paymentMode === 1 ? Colors.secondary : '#fff',
            },
          ]}
          onPress={() => setPaymentMode(1)}
        >
          <QrCode color={Colors.primary} />
          <Text style={styles.paymentText}>Pagar via QRCode</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            {
              backgroundColor: paymentMode === 2 ? Colors.secondary : '#fff',
            },
          ]}
          onPress={() => setPaymentMode(2)}
        >
          <Key color={Colors.primary} />
          <Text style={styles.paymentText}>Pagar via chave Pix</Text>
        </TouchableOpacity>
      </View>

      <View style={{ gap: 16, marginTop: 24 }}>
        {paymentMode === 1 && permission?.granted && (
          <View style={{ gap: 16 }}>
            <CameraView
              style={{ height: 300, borderRadius: 12 }}
              facing={facing}
              barcodeScannerSettings={{
                barcodeTypes: ['qr'],
              }}
            />

            <Button text="PAGAR" onPress={handlePayment} />
          </View>
        )}

        {paymentMode === 2 && (
          <>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Cole a chave Pix aqui"
                placeholderTextColor="#999"
                value={pixKey}
                onChangeText={setPixKey}
              />
              <TouchableOpacity onPress={handlePasteClipboard}>
                <ClipboardPaste color={Colors.primary} size={24} />
              </TouchableOpacity>
            </View>

            <Button text="PAGAR" onPress={handlePayment} />
          </>
        )}
      </View>
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
  paymentOption: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.primary,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    padding: 12,
  },
  paymentText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    color: Colors.primary,
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
