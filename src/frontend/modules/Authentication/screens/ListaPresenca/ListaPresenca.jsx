import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Logo from "../../../../assets/images/Logo.png";
import Dropdown from "../../components/DropDown";
import { getStudents, registerAttendance } from "../../services/apiService";
import { Button } from "../../components/ButtonCadastro";

export default function ListaPresenca() {
  const route = useRoute();
  const turma = route.params?.item;
  const navigation = useNavigation();
  const [listaPresenca, setListaPresenca] = useState([]);
  const [attendanceStudent, setAttendanceStudent] = useState([]);
  useEffect(() => {
    getAlunos();
  }, []);

  console.log(attendanceStudent.studentName);
  const submitStudentAttendence = async () => {
    try {
      for (const student of attendanceStudent) {
        console.log(
          `Registrando: ${student.studentName}, Presente: ${student.isPresent}`
        );
        const data = {
          studentId: "",
          studentName: student.studentName,
          subject: "",
          date: Date.now,
          isPresent: student.isPresent,
          justification: "",
          recordedBy: ""
        }
        await registerAttendance(data);
      }
      Alert.alert("Sucesso", "Lista de presença registrada com sucesso!");
    } catch (error) {
      console.log("Erro ao registrar presença", error);
      Alert.alert("Erro", "Falha ao registrar a lista de presença.");
    }
  };

  const getAlunos = async () => {
    try {
      const response = await getStudents(turma.name);
      setListaPresenca(response);
    } catch (error) {
      console.log("Erro ao recuperar as turmas", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={Logo} />
      <Text style={styles.titleTela}>{turma.name}</Text>
      <SafeAreaView style={styles.containerTurma}>
        <FlatList
          data={listaPresenca}
          keyExtractor={(item, index) => `${item.id || index}`}
          renderItem={({ item }) => (
            <View style={styles.containerAluno}>
              <Text style={styles.titleAlunos}>{item.name}</Text>
              <Dropdown
                style={styles.buttonStyle}
                data={[
                  { value: true, label: "Presente" },
                  { value: false, label: "Ausente" },
                ]}
                placeholder="Opção"
                onChange={(selectedItem) => {
                  console.log("Selecionado:", selectedItem);
                  setAttendanceStudent((prevState) => {
                      const updatedState = prevState.filter(
                          (student) => student.studentName !== item.name
                      );
                      return [
                          ...updatedState,
                          {
                              studentName: item.name,
                              isPresent: selectedItem.value,
                          },
                      ];
                  });
              }}
              />
            </View>
          )}
        />
        <Button
          title="Lançar Presença"
          style={styles.buttonStyle}
          onPress={() => submitStudentAttendence(attendanceStudent)}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    top: 10,
  },
  containerTurma: {
    backgroundColor: "#C0C2C4",
    margin: 10,
    borderRadius: 15,
    height: 600,
  },
  containerAluno: {
    margin: 20,
    marginBottom: 60,
  },
  titleAlunos: {
    fontSize: 20,
  },
  titleTela: {
    fontSize: 50,
    paddingLeft: 60,
    marginBottom: 20,
  },
  logo: {
    marginLeft: 310,
    height: 50,
    width: 60,
  },
  buttonStyle: {
    backgroundColor: "#96CA5E",
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
