import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export function Button({ title, ...rest}){
    return(
        <TouchableOpacity style={styles.container}{...rest}>
            <Text style={styles.title}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}