import { Dimensions, StyleSheet } from "react-native";
import { APP_COLORS } from "./color";
import { FONTS } from "./fonts";


export const PROFILE_STYLE = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: APP_COLORS.WHITE_COLOR.color,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  top_section: {
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginLeft: 10,
    marginRight: 10,
  },
  profile_image: {
    height: Math.ceil(Dimensions.get("window").width / 4),
    width: Math.ceil(Dimensions.get("window").width / 4),
    borderWidth: 2,
    borderColor: APP_COLORS.PRIMARY_COLOR.color,
    backgroundColor: APP_COLORS.PRIMARY_COLOR.color,
    borderRadius: Math.ceil(Dimensions.get("window").width / 4),
    marginRight: 5,
  },
  profile_image_supervisor: {
    height: Math.ceil(Dimensions.get("window").width / 7),
    width: Math.ceil(Dimensions.get("window").width / 7),
    borderWidth: 2,
    borderColor: APP_COLORS.PRIMARY_COLOR.color,
    backgroundColor: APP_COLORS.PRIMARY_COLOR.color,
    borderRadius: 50,
    marginRight: 5,
  },
  profile_infos_container: {
    flex: 1,
  },
  profile_infos_name: {
    fontWeight: "bold",
    color: APP_COLORS.PRIMARY_COLOR.color,
  },
  profile_infos_phone: {
    // color: APP_COLORS.PRIMARY_COLOR.color,
  },
  default_image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  disconnect: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    borderRadius: 50,
    backgroundColor: APP_COLORS.RED_COLOR.color,
    height: Math.ceil(Dimensions.get("window").width / 11),
    width: Math.ceil(Dimensions.get("window").width / 11),
  },
  account_options: {
    flex: 1,
    marginTop: 25,
    padding: 5,
    margin: 5,
  },
  account_options_item: {
    borderRadius: 10,
    padding: 12,
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    // borderBottomWidth: 1,
    backgroundColor: APP_COLORS.WHITE_COLOR.color,
  },
  developer: {
    marginTop: 25,
    justifyContent: "center",
    flexDirection: "row",
  },
  made_by: {
    color: APP_COLORS.PRIMARY_COLOR.color,
    fontSize: 12,
    textAlign: "center",
  },
  developer_infos: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    textAlign: "center",
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 19,
  },
});
