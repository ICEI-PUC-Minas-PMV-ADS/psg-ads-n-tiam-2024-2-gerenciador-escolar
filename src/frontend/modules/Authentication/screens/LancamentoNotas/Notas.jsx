import React, { useState, useEffect, useRef } from "react";
import { Text, StyleSheet, View, TextInput, ActivityIndicator, FlatList, Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getGrades } from "../../services/apiService";
import { submitGrades } from "../../services/apiService";


export default function Notas() {
  const route = useRoute();
  const aluno = route.params?.nome;
  const turma = route.params?.turma;
  const [portugues, setPortugues] = useState("");
  const [matematica, setMatematica] = useState("");
  const [ciencias, setCiencias] = useState("");
  const [artes, setArtes] = useState("");
  const [historia, setHistoria] = useState("");
  const [geografia, setGeografia] = useState("");
  const [ingles, setIngles] = useState("");
  const [loading, setLoading] = useState(true);



  const subjects = [
    { name: "Português", value: portugues, setValue: setPortugues },
    { name: "Matemática", value: matematica, setValue: setMatematica },
    { name: "Ciências", value: ciencias, setValue: setCiencias },
    { name: "Artes", value: artes, setValue: setArtes },
    { name: "Geografia", value: geografia, setValue: setGeografia },
    { name: "História", value: historia, setValue: setHistoria },
    { name: "Inglês", value: ingles, setValue: setIngles },
  ];

  const handleSubmitGrade = async (turma, aluno, subject, grade) => {
    try {
        console.log(turma)
        console.log(aluno)
        console.log(subject)
        console.log(grade)
      await submitGrades(turma, aluno, subject, grade);
      alert(`Nota de ${aluno} enviada com sucesso!`);
    } catch (error) {
      console.error("Erro ao enviar a nota:", error);
      alert(`Erro ao enviar a nota de ${aluno}`);
    }
  };

  const handleInputChange = (subjectName, newValue) => {
    const subject = subjects.find((s) => s.name === subjectName);
    if (subject) {
      subject.setValue(newValue);
    }
  };


  useEffect(() => {
    fetchAllGrades();
  }, []);

  const fetchAllGrades = async () => {
    try {
      const portuguesGrade = await getGrades(turma, aluno.name, "Português");
      setPortugues(portuguesGrade || "");

      const matematicaGrade = await getGrades(turma, aluno.name, "Matemática");
      setMatematica(matematicaGrade || "");

      const cienciasGrade = await getGrades(turma, aluno.name, "Ciências");
      setCiencias(cienciasGrade || "");

      const artesGrade = await getGrades(turma, aluno.name, "Artes");
      setArtes(artesGrade || "");

      const historiaGrade = await getGrades(turma, aluno.name, "História");
      setHistoria(historiaGrade || "");

      const geografiaGrade = await getGrades(turma, aluno.name, "Geografia");
      setGeografia(geografiaGrade || "");

      const inglesGrade = await getGrades(turma, aluno.name, "Inglês");
      setIngles(inglesGrade || "");
    } catch (error) {
      console.error("Erro ao carregar as notas:", error);
    }finally {
        setLoading(false); 
      }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.titleTela}>{aluno.name}</Text>
      <View style={styles.container}>
        <View style={styles.containerNotas}>
          <FlatList
          data={subjects}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => (
            <View style={styles.containerNotas}>
              <Text style={styles.titleMateria}>{item.name}</Text>
              <TextInput
                style={styles.input}
                placeholder={item.value.toString()}
                value={item.value.toString()}
                onChangeText={(text) => handleInputChange(item.name, text)}
              />
              <Button
              title="Enviar"
              placeholder="Enviar"
              style={styles.button}
              onPress={() => handleSubmitGrade(turma, aluno.name, item.name, parseFloat(item.value))}
              >  
              </Button>
            </View>
          )}
        />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C0C2C4",
    margin: 40,
    height: 600,
  },
  containerAluno: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerNotas: {
    justifyContent: "center",
    alignItems: "center",
    top: 10,
  },
  titleTela: {
    fontSize: 50,
    textAlign: "center",
    marginTop: 30,
  },
  titleAluno: {
    fontSize: 24,
    color: "black",
    top: 40
  },
  titleMateria: {
    fontSize: 18,
    backgroundColor: "grey",
    borderRadius: 5,
    width: 180,
    height: 35,
    textAlign: "center",
    lineHeight: 35,
    marginRight: 110,
    margin: -6,
  },
  button: {
    backgroundColor: "blue",
    height: 50,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  input: {
    backgroundColor: "white",
    width: 50,
    height: 35,
    borderRadius: 5,
    marginBottom: 30,
    marginLeft: 200,
    bottom: 30,
    textAlign: "center",
  },
  sendIcon: {
    marginLeft: 10,
    marginTop: 5,
  },
});
