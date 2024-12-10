import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Logo from '../../../../assets/images/Logo.png';
import { getReport,session, logout } from "../../services/apiService";
import { Button } from '../../components/ButtonCadastro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function RelatorioAluno() {
  const route = useRoute();
  const nomeAluno = route.params?.nomeAluno;
  const nomeTurma = route.params?.nomeTurma;
  const navigation = useNavigation();
  const [relatorioData, setRelatorioData] = useState([]);
  const [sessionData, setSessionData] = useState([]);
  

  useEffect(() => {
    getSession();
    checkSession();
  }, []);
  
  useEffect(() => {
    if (sessionData?.name && sessionData?.className) {
      getRelatorios(sessionData.name, sessionData.className);
    }
  }, [sessionData]);
  
  const getSession = async () => {
    try {
      const response = await session();
      setSessionData(response);
    } catch (error) {
      console.log("Erro ao recuperar o usuário", error);
    }
  };

  const getRelatorios = async (name, className) => {
    try {
      const response = await getReport(name, className);
      setRelatorioData(response.report);
    } catch (error) {
      console.log("Erro ao recuperar os relatórios", error);
    }
  }; 

  const handleLogout = async () => {
    try {
      await logout();
      await AsyncStorage.removeItem("userSession");
      Alert.alert("Sucesso", "Você foi deslogado com sucesso.");
      navigation.replace("LoginScreen");
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
      Alert.alert("Erro", "Falha ao realizar logout.");
    }
  };

  const checkSession = async () => {
    try {
      const sessionData = await AsyncStorage.getItem("userSession");
      if (!sessionData) {
        navigation.replace("LoginScreen");
      }
    } catch (error) {
      console.error("Erro ao verificar sessão:", error);
      navigation.replace("LoginScreen");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={styles.logo}>
            <Ionicons name="log-out-outline" size={35} color="black"/>
            </TouchableOpacity>
      <Text style={styles.titleTela}>Relatório</Text>
      <View style={styles.containerTurma}>
        <View style={styles.containerAluno}>
          <Text style={styles.titleAlunos}>{nomeAluno}</Text>
        </View>
        <View style={styles.containerRelatorio}>
            {relatorioData.length > 0 ? (
                <>
                <Text style={styles.faltas}>
                    Total de Faltas:{" "}
                    {(
                    relatorioData.filter((item) => item.attendance === 0).length *
                    2.5
                    ).toFixed(2)}%
                </Text>

                {relatorioData.map((item, index) => (
                    <View key={index} style={styles.relatorioItem}>
                    <Text style={styles.materia}>{item.subject}</Text>
                    <Text>Notas: {item.grades}</Text>
                    </View>
                ))}
                </>
            ) : (
                <Text>Aguardando dados...</Text>
            )}
            </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    top: 10,
  },
  containerTurma: {
    backgroundColor: '#C0C2C4',
    margin: 10,
    borderRadius: 15,
    height: 600,
  },
  containerAluno: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  titleAlunos: {
    fontSize: 30,
  },
  titleTela: {
    fontSize: 50,
    paddingLeft: 85,
    marginBottom: 20,
  },
  logo: {
    marginLeft: 310,
    height: 50,
    width: 60,
  },
  containerRelatorio: {},
  relatorioItem: {
    marginBottom: 20,
    marginLeft:40
  },
  Button:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#96CA5E',
    height:40,
    width: 110,
    borderRadius: 12,
    marginLeft: 220,
    bottom: 30
  },
  materia:{
    justifyContent:'center',
    alignItems:'center',
    fontSize: 17
  },
  faltas:{
    marginLeft: 200,
    top: 495
  }
});
