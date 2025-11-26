import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../Styles/Theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { convertDateToString } from '../utils/DateConverter';


export default function InputDateComponent({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  style,
  tipo = "Calendar" //Spinner ou Calendar
}) {

    const [showPicker, setShowPicker] = useState(false);


    function handleConfirm(selectedDate) {
        const formatted = convertDateToString(selectedDate);
        onChangeText(formatted); 
        setShowPicker(false);
    }


  return (
    <View style={[styles.container, style]}>

      {label && <Text style={GlobalStyles.label}>{label}</Text>}

      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput
          style={[GlobalStyles.input]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          editable={false}
        />

      </TouchableOpacity>

            <DateTimePickerModal
                isVisible={showPicker}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setShowPicker(false)}
                display={tipo}

            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
});
