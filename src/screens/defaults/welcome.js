import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FullLoadingContainer from "../../components/loaders/full-loading";

export default function Welcome({}) {
  return (
    <View style={styles.container}>
      <FullLoadingContainer/>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
