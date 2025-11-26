import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { GlobalStyles, Colors } from "../Styles/Theme";

export default function CustomAlert({ visible, title, message, onConfirm, onCancel, confirmText = "OK", cancelText = "Cancelar" }) {
  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.5}
      animationIn="zoomIn"
      animationOut="zoomOut"
      useNativeDriver
    >
      <View style={GlobalStyles.modalContainer}>
        <View style={GlobalStyles.modalBox}>
          {title && <Text style={GlobalStyles.modalTitle}>{title}</Text>}
          {message && <Text style={GlobalStyles.modalMessage}>{message}</Text>}

          <View style={GlobalStyles.modalButtons}>
            {onCancel && (
              <TouchableOpacity style={[GlobalStyles.modalButton, GlobalStyles.modalCancel]} onPress={onCancel}>
                <Text style={GlobalStyles.modalButtonText}>{cancelText}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={[GlobalStyles.modalButton, GlobalStyles.modalConfirm]} onPress={onConfirm}>
              <Text style={GlobalStyles.modalButtonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}