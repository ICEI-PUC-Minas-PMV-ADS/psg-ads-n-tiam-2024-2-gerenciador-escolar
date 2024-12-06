import React,{ useState } from "react";
import { Text,StyleSheet,View,TextInput } from "react-native";
import { Button } from '../../components/ButtonCadastro';
import { useRoute } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';

export default function Notas(){

    const route = useRoute();
    const nomeAluno = route.params?.nome;
    const [portugues, setPortugues] = useState('');
    const [matematica, setMatematica] = useState('');
    const [ciencias, setCiencias] = useState('');
    const [educacaoFisica, setEducacaoFisica] = useState('');
    const [artes, setArtes] = useState('');

    return(
    <View> 
        <Text style={styles.titleTela}>Lançar Notas</Text>
        <View style={styles.container}>
            <View style={styles.containerAluno}>
                <Text style={styles.titleAluno}>{nomeAluno}</Text>
            </View>
            <View style={styles.containerNotas}>
                <Text style={styles.titleMateria}>Língua Portuguesa</Text>
                <TextInputMask
                        style={styles.input}
                        type={"custom"}
                        options={{
                            mask:'99,9',
                            translation:{
                               ',':function(val) {
                                    return [' ', '#', ',', '.', '!'].indexOf(val) >= 0 ? val : null;
                                }
                            }
                        }}
                        value={portugues}
                        onChangeText={text => setPortugues(text)}
                        placeholder="0"
                    />

                    <Text style={styles.titleMateria}>Matemática</Text>
                    <TextInputMask
                        style={styles.input}
                        type={"custom"}
                        options={{
                            mask:'99,9',
                            translation:{
                               ',':function(val) {
                                    return [' ', '#', ',', '.', '!'].indexOf(val) >= 0 ? val : null;
                                }                             
                            }
                        }}
                        placeholder="0"
                        value={matematica}
                        onChangeText={text => setMatematica(text)}
                    />

                    <Text style={styles.titleMateria}>Ciências</Text>
                    <TextInputMask
                        style={styles.input}
                        type={"custom"}
                        options={{
                            mask:'99,9',
                            translation:{
                               ',':function(val) {
                                    return [' ', '#', ',', '.', '!'].indexOf(val) >= 0 ? val : null;
                                }
                            }
                        }}
                        placeholder="0"
                        value={ciencias}
                        onChangeText={text => setCiencias(text)}
                    />

                    <Text style={styles.titleMateria}>Educação Física</Text>
                    <TextInputMask
                        style={styles.input}
                        type={"custom"}
                        options={{
                            mask:'99,9',
                            translation:{
                               ',':function(val) {
                                    return [' ', '#', ',', '.', '!'].indexOf(val) >= 0 ? val : null;
                                }
                            }
                        }}
                        placeholder="0"
                        value={educacaoFisica}
                        onChangeText={text => setEducacaoFisica(text)}
                    />

                    <Text style={styles.titleMateria}>Artes</Text>
                    <TextInputMask
                        style={styles.input}
                        type={"custom"}
                        options={{
                            mask:'99,9',
                            translation:{
                                ',':function(val) {
                                     return [' ', '#', ',', '.', '!'].indexOf(val) >= 0 ? val : null;
                                 }
                             }
                        }}
                        placeholder="0"
                        value={artes}
                        onChangeText={text => setArtes(text)}
                    />
                <Button title="Lançar Notas" style={styles.button}></Button>
            </View>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#C0C2C4', 
        margin: 40,
        height:600
    },
    containerAluno: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop:15
    },
    containerNotas: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        top:10
    },
    titleTela: {
        fontSize: 50,
        textAlign: 'center',
        marginTop: 30,
    },
    titleAluno: {
        fontSize: 24,
        color: 'black'
    },
    titleMateria: {
        fontSize: 18,
        backgroundColor: 'grey',
        borderRadius: 5,
        width: 180,
        height: 35,
        textAlign: 'center',
        lineHeight: 35,
        marginRight:110,
        margin:-6
    },
    button: {
        backgroundColor: 'blue',
        height: 30,
        width: 160,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        bottom:20
    },
    input:{
        backgroundColor: 'white',
        width: 50,
        height: 35, 
        borderRadius: 5,
        marginBottom: 30,
        marginLeft:200,
        bottom:30,
        textAlign:'center'
    }
});
