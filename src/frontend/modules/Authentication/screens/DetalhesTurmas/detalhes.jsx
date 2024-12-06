import React from 'react';
import { FlatList, StyleSheet,Text,View,Image} from 'react-native';
import { Button } from '../../components/ButtonCadastro';
import Logo from '../../../../assets/images/Logo.png';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Detalhes(){

    const route = useRoute();
    const { turma } = route.params;
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Image 
                style={styles.logo}
                source={Logo}
            />
            <Text style={styles.titleTela}>{turma.name}</Text>
                <View style={styles.containerTurma}>
                    <Text style={styles.titleTurma}> Lista de Presença</Text>
                    <Text style={styles.titleAlunos}> Alunos</Text>
                    <Button title="Acessar" style={styles.buttonStyle}></Button>
                </View>
                <View style={styles.containerTurma}>
                    <Text style={styles.titleTurma}> Lançamento de Notas</Text>
                    <Text style={styles.titleAlunos}> Alunos</Text>
                    <Button title="Acessar" style={styles.buttonStyle} onPress={()=> navigation.navigate('DetalhesNotas',{item:turma})}></Button>
                </View>
        </View>
    )}

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:20,
        top:10
    },
    containerTurma:{
        backgroundColor: 'grey',
        height: 120,
        margin: 10,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 10
    },
    titleTurma:{
        color: 'white',
        marginBottom: 60
    },
    titleAlunos:{
        color:'white',
        position: 'absolute',
        left:30,
        top: 80
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
    },
    titleTela:{
        fontSize: 50,
        paddingLeft:60,
        marginBottom:33,
        marginTop:50
    },
    logo:{
        marginLeft:310,
        height:50,
        width:60
    }
})
