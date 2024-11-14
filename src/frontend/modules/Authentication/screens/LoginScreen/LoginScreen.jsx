import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import CustomButton from '../../components/Button';
import { Button } from 'react-native-paper';
import { black, white } from 'react-native-paper/src/styles/themes/v2/colors';
import Logo from '../../../../assets/images/Logo.png'
import {
  validateEmailFormat, 
  validateEmailLength, 
  isEmailNotEmpty, 
  validateNoInvalidCharacters,
} from '../../utils/validation'


export default function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Image
      style={styles.image}
      source={Logo}
      />
      <TitleText />
      <Credentials />
      <CustomButton title={"Entrar"}/>
      <GhostButton navigation={navigation}/>
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

  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [validatePassword, setValidatePassword] = useState({ number: false, length: false });
  const [isPasswordTouched, setIsPasswordTouched] = useState(false); 


  const securePassword = (password) => {
    setIsPasswordTouched(true); 
    const regexNumber = RegExp(/^(?=,*[0-9]).+$/)
    const length = password.length >= 6

    setValidatePassword({
      number: regexNumber.test(password),
      length
    })
  }

  const secureEmail = (email) => {
    const isValid = 
      validateEmailFormat(email) &&
      validateEmailLength(email) &&
      isEmailNotEmpty(email) &&
      validateNoInvalidCharacters(email);

    setIsValidEmail(isValid);
  };

  const isPasswordValid = validatePassword.number && validatePassword.length;
  const isFormValid = isValidEmail && isPasswordValid;

  return (
    <View>
      <TextInput
        style={[styles.textInput, !isValidEmail && styles.invalidTextInput]}
        placeholder = "E-mail"
        autoCapitalize='none'
        onChangeText={(email) =>{
          setEmail(email);
          secureEmail(email);
        }}
        />

        <TextInput 
        style={[
          styles.textInput, 
          isPasswordTouched && !isPasswordValid && styles.invalidTextInput
          ]}
        placeholder="Senha"
        secureTextEntry
        onChangeText={(password) =>{
          securePassword(password)
        }}
        />
        <CustomButton title="Entrar" disabled={!isFormValid} />
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

  invalidTextInput: {
    borderColor: 'red',
  },

  errorText : {
    color: 'red'
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





