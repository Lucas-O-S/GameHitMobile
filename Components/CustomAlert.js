import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

export default function CustomAlert({ visible, title, message, onConfirm, onCancel, confirmText = "OK", cancelText = "Cancelar" }) {
  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.5}
      animationIn="zoomIn"
      animationOut="zoomOut"
      useNativeDriver
    >
      <View>
        {title && <Text>{title}</Text>}
        {message && <Text>{message}</Text>}
        
        <View style={{ justifyContent: "center" }}>
          {onCancel && (
            <TouchableOpacity onPress={onCancel}>
              <Text>{cancelText}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity  onPress={onConfirm}>
            <Text>{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}