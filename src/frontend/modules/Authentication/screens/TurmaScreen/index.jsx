import React, { useEffect,useState } from "react";
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { Button } from "../../components/ButtonCadastro";
import Logo from "../../../../assets/images/Logo.png";
import { logout,getClasses } from "../../services/apiService";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";



export default function Turma(){
 
  const [turmasData, setTurmasData] = useState([]);
  const navigation = useNavigation();
   
  useEffect(()=>{
    checkSession();
    getTurmas();
  },[]);
  
  const getTurmas = async()=>{
    try{
      const response = await getClasses();
      setTurmasData(response);
    }catch(error){
      console.log("Erro ao recuperar as turmas",error);
    }
  };

  checkSession = async () => {
    try {
      const sessionData = await AsyncStorage.getItem("userSession");
      if (!sessionData) {
        navigation.replace("LoginScreen");
      }
    } catch (error) {
      console.error("Erro ao verificar sessão:", error);
      navigation.replace("LoginScreen");
    }
  };

  handleLogout = async () => {
    try {
      await logout();
      await AsyncStorage.removeItem("userSession");
      Alert.alert("Sucesso", "Você foi deslogado com sucesso.");
      navigation.replace("LoginScreen");
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
      Alert.alert("Erro", "Falha ao realizar logout.");
    }
  };


    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={handleLogout}>
          <Image style={styles.logo} source={Logo} />
        </TouchableOpacity>
        <Text style={styles.titleTela}>Turmas</Text>
        <FlatList
          data={turmasData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.containerTurmas}>
              <Text style={styles.titleTurmas}>{item.name}</Text>
              <Text style={styles.titleAlunos}> Alunos</Text>
              <Button title="Acessar" style={styles.buttonStyle} onPress={()=> navigation.navigate('Detalhes',{turma:item})}></Button>
            </View>
          )}
        />
      </View>
    );}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    top: 10,
  },
  containerTurmas: {
    backgroundColor: "grey",
    height: 120,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  titleTurmas: {
    color: "white",
    marginBottom: 60,
  },
  titleAlunos: {
    color: "white",
    position: "absolute",
    left: 30,
    top: 80,
  },
  buttonStyle: {
    backgroundColor: "blue",
    height: 30,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
    right: 20,
    top: 75,
  },
  titleTela: {
    fontSize: 50,
    paddingLeft: 92,
    marginBottom: 33,
    marginTop: 30,
  },
  logo: {
    marginLeft: 310,
    height: 50,
    width: 60,
    top: 10,
  },
});
