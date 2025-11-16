import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ButtonComponent({ pressFunction, label }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pressFunction}>
        {
          label &&
            <Text style={styles.label}>{label}</Text>
        }
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
