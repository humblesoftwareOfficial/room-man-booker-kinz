import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { APP_COLORS } from "../../styling/color";

export default function BackButton({
  navigation,
  onClick,
  backgroundColor = APP_COLORS.WHITE_COLOR.color,
  iconColor = APP_COLORS.PRIMARY_COLOR.color,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.item,
        {
          backgroundColor,
        },
      ]}
      onPress={onClick}
    >
      <AntDesign name="arrowleft" size={16} color={iconColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  item: {
    marginBottom: 5,
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: APP_COLORS.WHITE_COLOR.color,
    padding: 7,
    justifyContent: "center",
    alignItems: "center",
    minWidth: Math.ceil(Dimensions.get("window").height / 18),
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#F3F3F3",
  },
});
