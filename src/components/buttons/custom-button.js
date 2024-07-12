import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { APP_COLORS } from "../../styling/color";
import { BUTTON_STYLE } from "../../styling/buttons";


export default function CustomButton({
  label,
  customWidth,
  bgColor = APP_COLORS.WHITE_COLOR.color,
  onClick = null,
  textColor = "white",
  borderColor = "",
  borderWidth = 0,
  padding = 15,
  disable = false,
  borderRadius = 10,
  fontWeight = "normal",
}) {
  const onPress = () => {
    if (!disable) onClick && onClick();
  };
  return (
    <View style={BUTTON_STYLE.container_button}>
      <TouchableOpacity
        style={[
          BUTTON_STYLE.button,
          {
            padding,
            width: customWidth || "100%",
            backgroundColor: disable ? "#CFCFCF" : bgColor,
            borderColor,
            borderWidth: borderWidth,
            borderRadius,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
        onPress={onPress}
        activeOpacity={disable ? 1 : 0.5}
      >
        <Text
          style={[BUTTON_STYLE.textButton, { color: disable ? "white" : textColor, fontWeight }]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
