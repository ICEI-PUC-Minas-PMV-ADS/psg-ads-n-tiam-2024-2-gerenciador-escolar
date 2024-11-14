import {createNativeStackNavigator} from '@react-navigation/native-stack'

import LoginScreen from '../modules/Authentication/screens/LoginScreen/LoginScreen'
import FormCadastro from '../modules/Authentication/screens/CadastroScreen/index'


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
        </Stack.Navigator>
    )
}
