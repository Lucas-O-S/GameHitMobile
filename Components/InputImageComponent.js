import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, Text, Alert, StyleSheet, View } from "react-native";
import ImageHelper from "../utils/ImageHelper";

export default function InputImageComponent({ value, onChange }) {
 
  const [image64, setImage64] = useState(value);

  useEffect(() => {
    if (value) {
      setImage64(value);
    }
  }, [value]);

  async function setImage() {
    try {

      const uriResult = await ImageHelper.getImageFromLibrary();

        if (uriResult) {
            const base64 = await ImageHelper.convertUriToBase64(uriResult);
            
            setImage64(base64);

            onChange?.({ uri: uriResult, base64 });
      
        }
    } catch (error) {
      
        console.log("Erro ao selecionar imagem:", error);
    
    }
  }

  return (
    <TouchableOpacity style={styles.imageBox} onPress={setImage}>
      {image64 ? (
        <Image style={styles.image} source={{ uri: image64 }} />
      ) : (
        <Text style={styles.placeholderText}>Toque para selecionar imagem</Text>
      )}
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  imageBox: {
    width: "100%",
    height: 200,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
    marginBottom: 20,
  },
  placeholderText: {
    color: "#999",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
