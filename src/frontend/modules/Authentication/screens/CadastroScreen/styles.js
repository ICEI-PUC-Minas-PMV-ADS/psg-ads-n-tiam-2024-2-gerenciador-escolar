import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#F4F5F6",
        justifyContent: "center",
        padding:24,
        gap: 16
    },
    title:{
        fontSize: 50,
        fontWeight: "700",
        marginBottom: 33,
        paddingLeft: 73
    },
    logo:{
        marginBottom: 10,
        marginLeft: 102
    }
})

export const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, 
      marginBottom: 20,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, 
      marginBottom: 20,
    },
  });