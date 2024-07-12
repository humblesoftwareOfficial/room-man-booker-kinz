import { Platform, StatusBar, StyleSheet } from "react-native";
import { APP_COLORS } from "./color";

export const STATUSBAR_HEIGHT = StatusBar.currentHeight - 25;

export const SAFE_AREA_VIEW = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.LIGHT_COLOR.color,
    marginTop: Platform.OS === "android" ? STATUSBAR_HEIGHT : 0,
  },
  marginTopIOS: {
    marginTop: Platform.OS === "android" ? 0 : 50,
  }
});
