import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../../components/Button';
import { Button } from 'react-native-paper';
import { black, white } from 'react-native-paper/src/styles/themes/v2/colors';
import Logo from '../../../../assets/images/Logo.png'


export default function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Image
      style={styles.image}
      source={Logo}
      />
      <TitleText />
      <Credentials />
      <CustomButton title={"Entrar"}></CustomButton>
      <GhostButton navigation={navigation}></GhostButton>
    </View>

  )
}

function GhostButton({navigation}){
  return(
    <View>
      <TouchableOpacity>
      <Button style={styles.ghostButton} onPress={()=> navigation.navigate('FormCadastro')}>
        <Text style={styles.textButton}>Cadastre-se</Text>
      </Button>
      </TouchableOpacity>
    </View>
  )
}

function Credentials() {
  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder = "E-mail"
        />

        <TextInput 
        style={styles.textInput}
        placeholder = "Senha"
        />
    </View>
  )
}

function TitleText() {
  return (
    <View>
      <Text style={styles.titleText}>Entrar</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
    
  },

  image: {
    marginBottom: 30
  },

  textButton: {
    fontSize: 16,
    color: black
  },

  responsibleText: {
    fontSize: 20,
    paddingTop: 20,
    color: black,
    fontWeight: 'bold'
  },

  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom : 30,
  },

  ghostButton: {
    marginTop: 40,
    marginBottom: 72
  },

  textInput: {
    width: 300,
    height: 40,
    borderRadius : 12,
    borderWidth : 1,
    marginBottom : 16,
    paddingStart : 10,
    backgroundColor:'#ECECEC',
    borderColor : '#B7B7B7',
    fontWeight: 'bold',
  }
});





