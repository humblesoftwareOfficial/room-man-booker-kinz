import { Dimensions, StyleSheet } from "react-native";
import { APP_COLORS } from "./color";
import { FONTS } from "./fonts";

export const HEADER_STYLE = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    justifyContent: "center",
  },
  main: {
    padding: 5,
    flex: 1,
    marginLeft: 15,
    marginRight: 10,
    // marginBottom: 10,
    borderColor: APP_COLORS.LIGHT_COLOR.color,
    // borderWidth: 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // elevation: 5,
    // shadowColor: "#DFDFDF",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // backgroundColor: APP_COLORS.WHITE_COLOR.color
  },
  main_left: {
    // margin: 7,
  },
  main_center: {
    flex: 1,
  },
  label_filter: {
    color: APP_COLORS.PRIMARY_COLOR.color,
    fontFamily: FONTS.championShip,
    fontSize: 20,
  },
  label_description: {
    color: "#000",
  },
  main_right: {
    margin: 7,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 7
  },
  left: {
    flex: 1,
    flexDirection: "row",
  },
  right: {
    flex: 1,
    flexDirection: "row-reverse",
    // margin: 1,
    alignItems: "center",
    backgroundColor: APP_COLORS.WHITE_COLOR.color,
  },
  center: {
    flex: 1,
    flexDirection: "row",
    margin: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    marginBottom: 5,
    marginRight: 5,
    borderRadius: 50,
    backgroundColor: APP_COLORS.WHITE_COLOR.color,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    minWidth: Math.ceil(Dimensions.get("window").height / 15),
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#F3F3F3",
  },
  item_circle: {
    marginBottom: 5,
    marginRight: 10,
    borderRadius: 50,
    backgroundColor: APP_COLORS.WHITE_COLOR.color,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    width: Math.ceil(Dimensions.get("window").height / 20),
    height: Math.ceil(Dimensions.get("window").height / 20),
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#F3F3F3",
  },
  app_container: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  appname: {
    color: APP_COLORS.PRIMARY_COLOR.color,
    fontFamily: FONTS.yesteryear,
    fontSize: 25,
  },
  appname_cont: {
    color: APP_COLORS.PRIMARY_COLOR.color,
    fontFamily: FONTS.pacificoRegular,
    fontSize: 25,
  },
  app_background: {
    // backgroundColor: APP_COLORS.PRIMARY_COLOR.color,
    borderRadius: 50,
    flexDirection: "row",
  },
  label_button: {
    color: APP_COLORS.SECONDARY_COLOR.color,
    fontSize: 8,
  },
  title: {
    color: "#FFF",
    fontFamily: FONTS.bold,
  },
});
