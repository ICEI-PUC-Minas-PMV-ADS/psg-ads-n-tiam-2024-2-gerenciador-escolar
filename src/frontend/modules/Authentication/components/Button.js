import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const CustomButton = ({ title, onPress, style }) => {
  return (
      <TouchableOpacity style={[styles.button]}>
        <Text style={[styles.text]}>{title}</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1534FC",
    borderRadius: 10,
    width: "60%",
    paddingVertical: 8,
    alignSelf: "center",
    top: 12,
  },

  text: {
    textAlign: 'center',
    color: 'white', 
    fontSize: 20
 }
});

export default CustomButton;
