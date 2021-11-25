import React from "react"
import { ActivityIndicator, View, StyleSheet, Dimensions } from "react-native"

const Loading = ({ loading }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3aacff" animating={loading} />
    </View>
  )
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    justifyContent: "center", 
    alignItems: "center",
  },
});