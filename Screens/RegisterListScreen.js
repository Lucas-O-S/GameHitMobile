import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, Alert, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import LoadingOverlay from "../Components/LoadingOverlay";
import { AuthHelper } from "../utils/AuthHelper";
import CustomAlert from "../Components/CustomAlert";

import { GlobalStyles, Colors } from "../Styles/Theme";
import { convertStandardDateToDmy } from "../utils/DateConverter";
// import { AuthContext } from "../utils/AuthContext"; // not used here
import { ListItemComponent } from "../Components/ListItemComponent";
import RegisterController from "../Controller/Register.Controller";

export default function RegisterListScreen({ navigation }) {

  const [registers, setRegisters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

    useFocusEffect(
        useCallback(() => {
       let timeout;

      async function loadData() {
        await firstLoad();

        timeout = setTimeout(loadData, 60000);
      }

      loadData();

            return () => clearTimeout(timeout);


        }, [])
    );

  async function firstLoad() {
    setLoading(true);
    try {
      const id = await AuthHelper.getUserIdFromToken();
      setUserId(id);

      const data = await RegisterController.findAllByUser(id);
      console.log("resposta: ", data);
      setRegisters(Array.isArray(data) ? data : []);

    } catch (error) {
      console.log(error);
      setRegisters([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try{
      setLoading(true);

      await RegisterController.delete(id);

      await firstLoad();

    }
    catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

  }


    return (
      <View style={GlobalStyles.container}>
        <LoadingOverlay visible={loading} />

      <FlatList
        data={registers}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <ListItemComponent
            content={() => (
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  {item.game.name}
                </Text>

                <Text style={{ color: '#555' }}>
                  {item.gameStatus.name }
                </Text>

              </View>
            )}
            showEditButton={true}
            showDeleteButton={true}
            editButtonLabel={"Editar"}
            editFunction={() => navigation.navigate("EditGameRegister", { register: item })}
            deleteButtonLabel={"Excluir"}
            useInternalConfirmation={false}
            deleteFunction={() => { setSelectedDeleteId(item.id); setDeleteModalVisible(true); }}
          />
        )}

        ListEmptyComponent={
          <Text style={{color: Colors.textSecondary, textAlign: 'center', marginTop: 50}}>
            Nenhum jogo encontrado
          </Text>
        }
      />

      <CustomAlert
        visible={deleteModalVisible}
        title={"Deseja Deletar Registro"}
        message={"Esta ação não poderá ser desfeita."}
        onConfirm={async () => {
          setDeleteModalVisible(false);
          try {
            await handleDelete(selectedDeleteId);
          } finally {
            setSelectedDeleteId(null);
          }
        }}
        onCancel={() => { setDeleteModalVisible(false); setSelectedDeleteId(null); }}
      />





      </View>

    );
}