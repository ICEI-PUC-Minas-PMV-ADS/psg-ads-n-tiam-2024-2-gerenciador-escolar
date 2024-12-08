import React,{useState,useEffect} from 'react';
import { StyleSheet , Text , View , Image, FlatList} from 'react-native';
import Logo from "../../../../assets/images/Logo.png";
import { getClasses } from "../../services/apiService";
import { Button } from "../../components/ButtonCadastro";
import { useNavigation } from "@react-navigation/native";

export default function Relatorio(){

    const [turmasData, setTurmasData] = useState([]);
    const navigation = useNavigation();

    useEffect(()=>{
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

    return(
        <View style={styles.container}>
          <Image style={styles.logo} source={Logo} />
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
})
