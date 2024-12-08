import React, {useState, useEffect}from 'react';
import { StyleSheet, Text, View, Image,FlatList, SafeAreaView } from 'react-native';
import { Button } from '../../components/ButtonCadastro';
import Logo from '../../../../assets/images/Logo.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getStudents } from "../../services/apiService";

export default function DetalhesRelatorios() {
  const route = useRoute();
  const turma = route.params?.turma;
  const navigation = useNavigation();
  const [listaAlunos,setListaAlunos] = useState([]);

    useEffect(()=>{
      getAlunos();
    },[]);
    
    const getAlunos = async()=>{
      try{
        console.log(turma.name)
        const response = await getStudents(turma.name);
        setListaAlunos(response);
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
            data={listaAlunos}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
                <View style={styles.containerAluno}>
                    <Text style={styles.titleAlunos}>{item.name}</Text>
                    <Button title="Acessar" style={styles.buttonStyle} onPress={()=> navigation.navigate('RelatorioAluno',{nomeAluno: item.name, nomeTurma: turma.name})}></Button>
                </View>
            )}
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
    backgroundColor: '#C0C2C4',
    margin: 10,
    borderRadius: 15,
    height: 600
  },
  containerAluno:{
    margin: 20,
   
  },
  titleAlunos: {
    fontSize: 20
  },
  buttonStyle: {
    backgroundColor: 'blue',
    height: 30,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    right: 10
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
});
