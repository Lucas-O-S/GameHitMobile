import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import CustomAlert from "./CustomAlert";
import { GlobalStyles, Colors } from "../Styles/Theme";

export function ListItemComponent({
    content = null,
    onPress = (() => {return}),
    editFunction = (() => {return}),
    deleteFunction = null,
    confirmationMessage = "Deseja realmente excluir?",
    confirmationMessageTitle = "Confirmar exclusão",
    editButtonLabel = "Editar",
    deleteButtonLabel = null,
    showEditButton = false,
    showDeleteButton = false,
    // when false, the parent is responsible for confirmation (no internal modal)
    useInternalConfirmation = true,

  }) {
  const [alertVisible, setAlertVisible] = useState(false);

  function callDelete() {
    setAlertVisible(true);
  }

  return (
    <View style={GlobalStyles.listItem}>
      <TouchableOpacity style={GlobalStyles.listItemContent} onPress={onPress}>
        {content && content()}
      </TouchableOpacity>

      <View style={GlobalStyles.listItemButtons}>
        {showEditButton && editFunction && (
          <TouchableOpacity style={[GlobalStyles.listItemButton]} onPress={editFunction}>
            <Text style={GlobalStyles.listItemButtonText}>{editButtonLabel}</Text>
          </TouchableOpacity>
        )}

        {showDeleteButton && deleteFunction && (
          useInternalConfirmation ? (
            <TouchableOpacity style={[GlobalStyles.listItemButton, { backgroundColor: Colors.danger }]} onPress={callDelete}>
              {deleteButtonLabel && <Text style={GlobalStyles.listItemButtonText}>{deleteButtonLabel}</Text>}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[GlobalStyles.listItemButton, { backgroundColor: Colors.danger }]} onPress={async () => await deleteFunction()}>
              {deleteButtonLabel && <Text style={GlobalStyles.listItemButtonText}>{deleteButtonLabel}</Text>}
            </TouchableOpacity>
          )
        )}
      </View>

      {useInternalConfirmation && (
        <CustomAlert
          visible={alertVisible}
          title={confirmationMessage}
          message={confirmationMessageTitle}
          onCancel={() => setAlertVisible(false)}
          onConfirm={async () => {
            await deleteFunction();
            setAlertVisible(false);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  editButton: {
    padding: 15,
    backgroundColor: '#ffc107',
  },
  editButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 15,
    backgroundColor: '#dc3545',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
