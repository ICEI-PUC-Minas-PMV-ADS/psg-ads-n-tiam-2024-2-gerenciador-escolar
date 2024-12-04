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
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
