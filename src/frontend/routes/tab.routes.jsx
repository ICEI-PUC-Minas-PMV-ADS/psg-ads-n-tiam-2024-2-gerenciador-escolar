import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Turmas from '../modules/Authentication/screens/TurmaScreen';  
import Relatorio from '../modules/Authentication/screens/RelatorioScreen'; 
import Cadastro from '../modules/Authentication/screens/CadastroScreen';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown:false,
        tabBarStyle:{
            backgroundColor:'#F5F5F5'
            }
        }}>
        <Tab.Screen
            name="Turmas" 
            component={Turmas}
            options={{
                tabBarIcon: ({color,size})=> <Feather name='users' color={color} size={size}/>
            }}
            
        />
        <Tab.Screen 
            name="Relatório" 
            component={Relatorio}
            options={{
                tabBarIcon: ({color,size})=> <Feather name='file-text' color={color} size={size}/>
            }}
        />

         <Tab.Screen 
            name="Cadastro" 
            component={Cadastro}
            options={{
                tabBarIcon: ({color,size})=> <Feather name='file-text' color={color} size={size}/>
            }}
        />


    </Tab.Navigator>
  );
}
