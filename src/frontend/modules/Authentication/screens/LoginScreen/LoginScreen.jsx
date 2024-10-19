import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import CustomButton from '../../components/Button';


export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <TitleText />
      <Credentials />
      <CustomButton title={"Entrar"}></CustomButton>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  titleText: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom : 30
  },

  textInput: {
    width: 300,
    height: 40,
    borderRadius : 12,
    borderWidth : 1,
    marginBottom : 16,
    paddingStart : 10,
    borderColor : 'black',
    fontWeight: 'bold',
  }
});





