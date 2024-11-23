import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import CustomButton from '../../components/Button';
import { Button } from 'react-native-paper';
import { black, white } from 'react-native-paper/src/styles/themes/v2/colors';
import Logo from '../../../../assets/images/Logo.png'
import {login} from '../../services/login'
import {
  validateEmailFormat, 
  validateEmailLength, 
  isEmailNotEmpty, 
  validateNoInvalidCharacters,
  validatePassword

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
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleLogin = async () => {
    try{
      const response = await login(email,password)
      console.log("Login bem-sucedido:", response);
      Alert.alert('Sucesso', `Bem-vindo, ${response.email}`)

    } catch(error){
      console.error("Erro no login:", error);
      Alert.alert('Erro', 'Falha no login.')
    }
  }

  const handleEmailChange = (input) => {
    setEmail(input)

    const isValid = 
    validateEmailFormat(input) &&
    validateEmailLength(input) &&
    isEmailNotEmpty(input) &&
    validateNoInvalidCharacters(input);

    setIsValidEmail(isValid)
  }

  const handlePasswordChange = (input) => {
    setPassword(input)
    setIsPasswordValid(validatePassword(input))
  };

  const isFormValid = isValidEmail && isPasswordValid

  return (
    <View>
      <TextInput
        style={[styles.textInput, !isValidEmail && styles.invalidTextInput]}
        placeholder = "E-mail"
        autoCapitalize='none'
        value = {email}
        onChangeText={handleEmailChange}
        />

        <TextInput 
        style={[styles.textInput, !isPasswordValid && styles.invalidTextInput]}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
        />
        <CustomButton 
        title="Entrar" 
        disabled={!isFormValid} 
        onPress={() => handleLogin()}
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





