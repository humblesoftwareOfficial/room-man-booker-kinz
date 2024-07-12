// ProgressBar.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

const ProgressBar = ({ label, progress, color }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Progress.Bar
        progress={progress}
        width={null}
        height={10}
        color={color}
        borderRadius={5}
        unfilledColor="#e0e0e0"
        borderWidth={0}
        style={styles.progressBar}
      />
      <Text style={styles.percentage}>{Math.round(progress * 100)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 20,
    flex: 1
  },
  label: {
    marginBottom: 15,
    textAlign: "center"
  },
  progressBar: {
    marginBottom: 5,
  },
  percentage: {
    fontSize: 14,
    color: "#555",
  },
});

export default ProgressBar;
