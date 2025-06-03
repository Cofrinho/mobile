import Colors from '@/constants/colors';
import { X } from 'lucide-react-native';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import Button from './Button';
import CopyCodeBox from './CopyCodeBox';

interface SharedGroupModalProps {
  code: string;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export default function SharedGroupModal({
  code,
  modalVisible,
  setModalVisible,
}: SharedGroupModalProps) {
  return (
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
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
              Código do grupo
            </Text>
            <CopyCodeBox code={code} />
            <Button text="Compartilhar" onPress={() => setModalVisible(false)} />
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
