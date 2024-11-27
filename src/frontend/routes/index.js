import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../modules/Authentication/screens/LoginScreen/LoginScreen';
import FormCadastro from '../modules/Authentication/screens/CadastroScreen/index';

import TabRoutes from './tab.routes';
import { Header } from 'react-native/Libraries/NewAppScreen';


const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
            />
            <Stack.Screen
                name="FormCadastro"
                component={FormCadastro}
            />
            <Stack.Screen
                name='TabRoutes'
                component={TabRoutes}
                options={{headerShown:false}}
            />
         </Stack.Navigator>

    )
}
