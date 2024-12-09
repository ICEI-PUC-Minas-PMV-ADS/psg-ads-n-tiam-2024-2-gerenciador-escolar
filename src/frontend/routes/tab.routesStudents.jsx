import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Relatorio from '../modules/Authentication/screens/RelatorioScreen'; 
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function RoutesTeacher() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown:false,
        tabBarStyle:{
            backgroundColor:'#F5F5F5'
            }
        }}>
        <Tab.Screen 
            name="Relatório" 
            component={Relatorio}
            options={{
                tabBarIcon: ({color,size})=> <Feather name='file-text' color={color} size={size}/>
            }}
        />
    </Tab.Navigator>
  );
}
