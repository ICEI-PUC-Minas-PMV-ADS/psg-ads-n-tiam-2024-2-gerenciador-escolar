import React,{Component} from 'react';
import { FlatList, StyleSheet,Text,View,Image} from 'react-native';
import { Button } from '../../components/ButtonCadastro';
import Logo from '../../../../assets/images/Logo.png';

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
                <Image 
                    style={styles.logo}
                    source={Logo}
                />
                <Text style={styles.titleTela}>Turmas</Text>
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
        flex:1,
        margin:20,
        top:10
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
    },
    titleTela:{
        fontSize: 50,
        paddingLeft:92,
        marginBottom:33,
        marginTop:30
    },
    logo:{
        marginLeft:310,
        height:50,
        width:60,
        top:10
    }
})
