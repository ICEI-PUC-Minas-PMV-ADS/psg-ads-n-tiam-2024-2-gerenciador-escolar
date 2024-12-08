import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import 'react-native-url-polyfill/auto'; 
import LoginScreen from './modules/Authentication/screens/LoginScreen/LoginScreen';
import FormCadastro from './modules/Authentication/screens/CadastroScreen/index';
import HomeScreen from './modules/Class/screens/HomeScreen';
import TurmaPrincipal from '../frontend/routes/tab.routes';
import Detalhes from './modules/Authentication/screens/DetalhesTurmas/detalhes';
import DetalhesNotas from './modules/Authentication/screens/DetelhesNotas/DetalhesNotas';
import Notas from './modules/Authentication/screens/LancamentoNotas/Notas';
import ListaPresenca from './modules/Authentication/screens/ListaPresenca/ListaPresenca';
import DetalhesRelatorios from './modules/Authentication/screens/DetalhesRelatorios/DetalhesRelatorios';
import RelatorioAluno from './modules/Authentication/screens/RelatorioAluno/RelatorioAluno';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="FormCadastro" component={FormCadastro} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name='Turma' component={TurmaPrincipal} options={{headerShown: false}} />
        <Stack.Screen name='Detalhes' component={Detalhes}/>
        <Stack.Screen name='DetalhesNotas' component={DetalhesNotas}/>
        <Stack.Screen name='Notas' component={Notas}/>
        <Stack.Screen name='ListaPresenca' component={ListaPresenca}/>
        <Stack.Screen name='DetalhesRelatorios' component={DetalhesRelatorios}/>
        <Stack.Screen name='RelatorioAluno' component={RelatorioAluno}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
