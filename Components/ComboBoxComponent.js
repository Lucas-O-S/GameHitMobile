import { View, Text } from "react-native"
import RNPickerSelect from 'react-native-picker-select';

export function ComboBoxComponent({
    label,
    onChange,
    items = [],
    placeHolder: placeholder = {label : "Escolha um valor", value: null }
    

}){



    return(
        <View>
            {
                label && 
                    <Text>{label}</Text>
            }
            <RNPickerSelect
                onValueChange={(value) => onChange(value)}
                items = {items}
                placeholder = {placeholder}

            />
        </View>
    )
}