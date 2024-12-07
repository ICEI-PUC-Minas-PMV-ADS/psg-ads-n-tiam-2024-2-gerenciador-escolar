import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Dropdown({ data, placeholder, onChange }) {
  const [expanded, setExpanded] = useState(false); 
  const [selectedItem, setSelectedItem] = useState(null); 
  const [dropdownPosition, setDropdownPosition] = useState(0); 

  const buttonRef = React.useRef(null); 

  const toggleDropdown = () => {
    setExpanded(!expanded);
  };

  const handleLayout = (event) => {
    const layout = event.nativeEvent.layout;
    const topOffset = layout.y;
    const heightOfComponent = layout.height;
    const adjustedTop = topOffset + heightOfComponent + (Platform.OS === "android" ? 0 : 5); 
    setDropdownPosition(adjustedTop); 
  };

  const handleSelect = (item) => {
    setSelectedItem(item); 
    onChange(item); 
    setExpanded(false); 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        ref={buttonRef}
        style={styles.button}
        onPress={toggleDropdown}
        onLayout={handleLayout}
      >
        <Text style={styles.buttonText}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <AntDesign name={expanded ? "caretup" : "caretdown"} size={20} />
      </TouchableOpacity>

      {expanded && (
        <View style={[styles.dropdown, { top: dropdownPosition }]}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "40%",
    marginVertical: 10,
    marginLeft: 180,
    bottom:45,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 6,
    padding: 10,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 5, 
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});
