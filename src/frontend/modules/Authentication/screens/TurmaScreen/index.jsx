import React,{Component} from 'react';
import { FlatList, StyleSheet,Text,View} from 'react-native';
import { Button } from '../../components/ButtonCadastro';

export default class Turma extends Component{

    constructor(props){
        super(props);
        this.state = {
            turmas: [
                {id:1,nome: 'Turma 001',alunos:32},
                {id:2,nome: 'Turma 002',alunos:28},
                {id:3,nome: 'Turma 003',alunos:20},
                {id:4,nome: 'Turma 004',alunos:18},
                {id:5,nome: 'Turma 005',alunos:36},
                {id:6,nome: 'Turma 006',alunos:40},
                {id:7,nome: 'Turma 007',alunos:42},
                {id:8,nome: 'Turma 008',alunos:31},
                {id:9,nome: 'Turma 009',alunos:33},
                {id:10,nome: 'Turma 010',alunos:38},
            ]
        }
    }

    render(){
        return(
            <View style={styles.container}>
                 <FlatList
                    data={this.state.turmas}
                    renderItem={({item}) =>
                    <View style={styles.containerTurmas}>
                        <Text style={styles.titleTurmas}>{item.nome}</Text>
                        <Text style={styles.titleAlunos}>{item.alunos} Alunos</Text>
                        <Button title="Acessar" style={styles.buttonStyle}></Button>
                    </View>
                    }
                 />
            </View>
         )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    containerTurmas:{
        backgroundColor: 'grey',
        height: 120,
        margin: 10,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 10
    },
    titleTurmas:{
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
    }
})
