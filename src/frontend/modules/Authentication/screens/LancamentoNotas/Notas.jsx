import React from "react";
import { Text,StyleSheet,View } from "react-native";
import { Button } from '../../components/ButtonCadastro';
import { useRoute } from '@react-navigation/native'

export default function Notas(){

    const route = useRoute();
    const nomeAluno = route.params?.nome;

    return(
    <View> 
        <Text style={styles.titleTela}>Lançar Notas</Text>
        <View style={styles.container}>
            <View style={styles.containerAluno}>
                <Text style={styles.titleAluno}>{nomeAluno}</Text>
            </View>
            <View style={styles.containerNotas}>
                <Text style={styles.titleMateria}>Língua Portuguesa</Text>
                <Text style={styles.titleMateria}>Matemárica</Text>
                <Text style={styles.titleMateria}>Ciências</Text>
                <Text style={styles.titleMateria}>Educação Física</Text>
                <Text style={styles.titleMateria}>Artes</Text>
                <Button title="Lançar Nota" style={styles.button}></Button>
            </View>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#C0C2C4',
        height: 600,
        margin: 40,
        marginTop: 50
    },
    containerAluno:{
        
    },
    containerNotas:{

    },
    titleTela:{
        fontSize: 50,
        justifyContent:'center',
        alignItems:'center',
        marginLeft: 50,
        marginTop: 30
    },
    titleAluno:{
        justifyContent:'center',
        alignItems:'center'
    },
    titleMateria:{

    },
    button:{
        backgroundColor: 'blue',
        height: 30,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    }
});