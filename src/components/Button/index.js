import React from "react"
import { TouchableOpacity, Text } from "react-native";

const ButtonComponent = ({ title, color, width, onPress }) => {
  return (
    <TouchableOpacity 
      style={{ backgroundColor: color, borderRadius: 10, margin: 10, width: width }}
      onPress={onPress}
    >
      <Text style={{ color: "#FFF", textAlign: "center", padding: 10, fontSize: 20 }}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ButtonComponent;