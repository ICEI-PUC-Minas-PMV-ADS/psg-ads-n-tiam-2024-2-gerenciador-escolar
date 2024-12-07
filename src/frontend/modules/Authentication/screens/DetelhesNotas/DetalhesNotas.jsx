import React, {useState, useEffect}from 'react';
import { StyleSheet, Text, View, Image,FlatList, SafeAreaView } from 'react-native';
import { Button } from '../../components/ButtonCadastro';
import Logo from '../../../../assets/images/Logo.png';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function DetalhesNotas() {
  const route = useRoute();
  const turma = route.params?.item;
  const navigation = useNavigation();
  

  function ListaAlunos(turma) {
    const qtalunos = 20;
    const listaDeNomes = [];
  
    for (let i = 0; i < qtalunos; i++) { 
      listaDeNomes.push({id: i+1, nome: `Aluno ${i + 1}` });
    }
    return listaDeNomes;
  }
  const listaNomes = ListaAlunos(turma);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={Logo} />
      <Text style={styles.titleTela}>{turma.name}</Text>
      <SafeAreaView style={styles.containerTurma}>
        <FlatList
            data={listaNomes}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
                <View style={styles.containerAluno}>
                    <Text style={styles.titleAlunos}>{item.nome}</Text>
                    <Button title="Lançar Nota" style={styles.buttonStyle} onPress={()=> navigation.navigate('Notas',{nome: item.nome})}></Button>
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
