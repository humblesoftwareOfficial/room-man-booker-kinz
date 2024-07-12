import { Platform, StyleSheet } from "react-native";
import { FONTS } from "./fonts";
import { APP_COLORS } from "./color";

export const SYSTEM_STYLING = StyleSheet.create({
  title: {
    // fontFamily: FONTS.bold,
    fontWeight: "bold",
    fontSize: 20,
  },
  app_name: {
    fontFamily: FONTS.championShip,
    color: APP_COLORS.PRIMARY_COLOR.color,
    fontSize: 24,
  },
  platformMarginBottom: {
    marginBottom: Platform.OS === "android" ? 10 : 25,
  },
});
