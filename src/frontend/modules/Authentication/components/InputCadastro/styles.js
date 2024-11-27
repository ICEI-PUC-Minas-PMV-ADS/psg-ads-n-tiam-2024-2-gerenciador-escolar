import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        width:"100%"
    },
    group:{
       width:"100%",
       height:56,
       backgroundColor:"#FFF",
       flexDirection:"row",
       alignItems:"center",
       overflow: "hidden",
       borderRadius: 20
    },
    icon:{
        width: 56,
        height: 56,
        justifyContent:"center",
        alignItems:"center",
        overflow: "hidden",
        borderRightWidth: 3 ,
        borderRightColor: "#f4f5f6",
        borderRadius: 20
    },
    control:{
       flex: 1,
       paddingLeft: 16,
       fontSize: 16
    },
    error:{
        fontSize: 14,
        marginTop: 7,
        color:"#DC1637"
    },
    eyeIcon:{
        width: 56,
        height: 56,
        justifyContent:"center",
        alignItems:"center",
        overflow: "hidden",
        borderRightWidth: 3 ,
        borderRightColor: "#f4f5f6",
        borderRadius: 20
    }
})