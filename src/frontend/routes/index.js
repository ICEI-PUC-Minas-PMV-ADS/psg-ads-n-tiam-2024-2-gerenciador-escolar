import {createNativeStackNavigator} from '@react-navigation/native-stack'

import LoginScreen from '../modules/Authentication/screens/LoginScreen/LoginScreen'


const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            />
        </Stack.Navigator>
    )
}
