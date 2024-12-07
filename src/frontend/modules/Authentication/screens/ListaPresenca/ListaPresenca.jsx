import React, { useEffect, useState } from "react";
import { View,Text,StyleSheet,SafeAreaView,FlatList,Image } from "react-native";
import { useNavigation,useRoute } from "@react-navigation/native";
import Logo from '../../../../assets/images/Logo.png';
import Dropdown from '../../components/DropDown';
import { Button } from "../../components/ButtonCadastro";
import { getStudents } from "../../services/apiService";

export default function ListaPresenca(){
    const route = useRoute();
    const turma = route.params?.item;
    const navigation = useNavigation();
    const [listaPresenca,setListaPresenca] = useState([]);

    useEffect(()=>{
      getAlunos();
    },[]);
    

    const getAlunos = async()=>{
      try{
        console.log(turma.name)
        const response = await getStudents(turma.name);
        setListaPresenca(response);
      }catch(error){
        console.log("Erro ao recuperar as turmas",error);
      }
    };


    return (
      <SafeAreaView style={styles.container}>
          <Image style={styles.logo} source={Logo} />
          <Text style={styles.titleTela}>{turma.name}</Text>
          <SafeAreaView style={styles.containerTurma}>
              <FlatList
                  data={listaPresenca}
                  keyExtractor={(item) => item.id} 
                  renderItem={({ item, index }) => (
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
                                  console.log(
                                      `Aluno: ${item.nome}, Posição: ${
                                          index + 1
                                      }, Escolha: ${selectedItem.label}`
                                  );
                              }}
                          />
                      </View>
                  )}
              />
              <Button title="Lançar Notas" />
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
      backgroundColor: '#C0C2C4',
      margin: 10,
      borderRadius: 15,
      height: 600
    },
    containerAluno:{
      margin: 20,
      marginBottom: 60
     
    },
    titleAlunos: {
      fontSize: 20
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
    buttonStyle:{
      backgroundColor: 'blue',
      height: 30,
      width: 80,
      justifyContent:'center',
      alignItems:'center',
      borderRadius: 10,
      position: 'absolute',
      right:20,
      top: 75
  }
  });