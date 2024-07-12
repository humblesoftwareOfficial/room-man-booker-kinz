import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { APP_COLORS } from "../../styling/color";

export default function FullLoadingContainer({
  text = "",
  flex = 1,
  backgroundColor = APP_COLORS.LIGHT_COLOR.color,
}) {
  return (
    <View
      style={{
        flex,
        justifyContent: "center",
        backgroundColor,
        alignItems: "center",
      }}
    >
      <View style={{ alignItems: "center" }}>
      <View style={styles.container}>
        <ActivityIndicator
          size="small"
          color={APP_COLORS.WHITE_COLOR.color}
        />
      </View>
      <Text>{text}</Text>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    backgroundColor: APP_COLORS.PRIMARY_COLOR.color,
    justifyContent: "center",
    alignItems: "center",
    width: Math.ceil(Dimensions.get("window").width / 7),
    height: Math.ceil(Dimensions.get("window").width / 7),
  },
});