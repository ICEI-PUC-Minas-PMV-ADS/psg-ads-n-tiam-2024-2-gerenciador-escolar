import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/Button';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { black, white } from 'react-native-paper/src/styles/themes/v2/colors';
import Logo from '../../../../assets/images/Logo.png'
import {login, session, requestPassword} from '../../services/apiService'
import {
  validateEmailFormat, 
  validateEmailLength, 
  isEmailNotEmpty, 
  validateNoInvalidCharacters,
  validatePassword

} from '../../utils/validation'


export default function LoginScreen({navigation}) {

  const [responsestring,setResponsestring] = useState('');

  useEffect(() =>{
    const checkSession = async () => {
      try{
        const sessionData = await session();
        if(sessionData){
          if(responsestring === "Secretary"){
            navigation.replace('Turma')
          }else if(responsestring === 'Teacher'){
            navigation.replace('RoutesTeacher')
          }else{
            navigation.replace('RoutesStudents')
          }
          
        }
      }catch (error) {
        console.error("Erro ao verificar sessão:", error);
      }
    }

    checkSession()

  }, [navigation,responsestring])

  return (
    <View style={styles.container}>
      <Image
      style={styles.image}
      source={Logo}
      />
      <TitleText />
      <Credentials setResponsestring={setResponsestring}/>
      <GhostButton/>
    </View>

  )
}

function GhostButton({}){
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, insira um e-mail válido.");
      return;
    }
    try {
      console.log(email)
      await requestPassword(email);
      Alert.alert("Sucesso", "Um e-mail para redefinição de senha foi enviado.");
      setModalVisible(false);
      setEmail(""); 
    } catch (error) {
      console.log("Erro")
      Alert.alert("Erro", "Não foi possível processar sua solicitação. Tente novamente mais tarde.");
    }
  };
  

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.ghostButton}>
          <Text style={styles.textButton}>Esqueci minha senha</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Recuperar Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleForgotPassword}
              >
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function Credentials({ setResponsestring }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleLogin = async () => {
    try{
      const response = await login(email,password)
      console.log("Login bem-sucedido");
      await AsyncStorage.setItem('userSession', JSON.stringify(response))
      if(response === "Secretary"){
        navigation.replace('Turma')
      }else if(response === 'Teacher'){
        navigation.replace('RoutesTeacher')
      }else{
        navigation.replace('RoutesStudents')
      }
      setResponsestring(response)
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
        style={[styles.textInput, !isValidEmail]}
        placeholder = "E-mail"
        autoCapitalize='none'
        value = {email}
        onChangeText={handleEmailChange}
        />

        <TextInput 
        style={[styles.textInput, !isPasswordValid]}
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
  },

  ghostButton: {
    marginTop: 40,
    marginBottom: 72
  },
  textButton: {
    color: "blue",
    textDecorationLine: "underline",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});





