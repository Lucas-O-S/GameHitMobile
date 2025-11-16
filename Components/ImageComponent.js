import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export default function ImageComponent({ image64, style, placeholderText = "Sem imagem" }) {
  return (
    <View style={[styles.imageBox, style]}>
      {image64 ? (
        <Image style={styles.image} source={{ uri: image64 }} />
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>{placeholderText}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
  },
  placeholderContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  placeholderText: {
    color: "#999",
    fontSize: 12,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
