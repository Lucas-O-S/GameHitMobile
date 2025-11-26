import { View, Text, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../Styles/Theme";

export default function ButtonComponent({ pressFunction, label, danger = false }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity
        style={[GlobalStyles.button, danger ? GlobalStyles.buttonDanger : null]}
        onPress={pressFunction}
      >
        {label && <Text style={GlobalStyles.buttonText}>{label}</Text>}
      </TouchableOpacity>
    </View>
  );
}
