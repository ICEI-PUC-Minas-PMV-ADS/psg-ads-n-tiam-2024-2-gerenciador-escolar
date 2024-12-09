import React,{useState,useEffect} from 'react';
import { StyleSheet , Text , View , Image, FlatList,TouchableOpacity,Alert} from 'react-native';
import Logo from "../../../../assets/images/Logo.png";
import { getClasses,logout } from "../../services/apiService";
import { Button } from "../../components/ButtonCadastro";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function Relatorio(){

    const [turmasData, setTurmasData] = useState([]);
    const navigation = useNavigation();

    useEffect(()=>{
        getTurmas();
        checkSession();
      },[]);
      
      const getTurmas = async()=>{
        try{
          const response = await getClasses();
          setTurmasData(response);
        }catch(error){
          console.log("Erro ao recuperar as turmas",error);
        }
      };

    const handleLogout = async () => {
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

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={handleLogout} style={styles.logo}>
            <Ionicons name="log-out-outline" size={35} color="black"/>
            </TouchableOpacity>
        <Text style={styles.titleTela}>Relatório</Text>
        <FlatList
          data={turmasData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.containerTurmas}>
              <Text style={styles.titleTurmas}>{item.name}</Text>
              <Text style={styles.titleAlunos}>Relatório</Text>
              <Button title="Acessar" style={styles.buttonStyle} onPress={()=> navigation.navigate('DetalhesRelatorios',{turma:item})}></Button>
            </View>
          )}
        />
      </View>
    )
}

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
        backgroundColor: "#96CA5E",
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
})
