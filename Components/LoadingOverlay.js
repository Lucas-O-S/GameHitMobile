import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function LoadingOverlay({ visible = false, message = "Carregando..." }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loaderText}>{message}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    elevation: 10, // 👈 ajuda no Android
  },
  loaderBox: {
    backgroundColor: "#333",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  loaderText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
});
