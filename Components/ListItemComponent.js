import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import CustomAlert from "./CustomAlert";

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
    showDeleteButton = false

  }) {
  const [alertVisible, setAlertVisible] = useState(false);

  function callDelete() {
    setAlertVisible(true);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.contentContainer} onPress={onPress}>
        {content && content()}
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        {showEditButton && editFunction &&
          <TouchableOpacity style={styles.editButton} onPress={editFunction}>
            <Text style={styles.editButtonText}>{editButtonLabel}</Text>
          </TouchableOpacity>
        }

        {showDeleteButton && deleteFunction &&
          <TouchableOpacity style={styles.deleteButton} onPress={callDelete}>
            {deleteButtonLabel &&
              <Text style={styles.deleteButtonText}>{deleteButtonLabel}</Text>
            }
          </TouchableOpacity>
        }
      </View>

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
