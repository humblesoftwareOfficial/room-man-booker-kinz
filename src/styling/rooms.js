import { StyleSheet, Dimensions } from "react-native";
import { FONTS } from "./fonts";
import { APP_COLORS } from "./color";

export const NEW_HOUSE_STYLE = StyleSheet.create({
  header: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    flexDirection: "row",
  },
  title_header: {
    flex: 1,
    flexDirection: "row-reverse",
    marginRight: 10,
  },
});

export const NEW_ROOM_STYLE = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 19,
  },
  property_item: {
    padding: 20,
    borderRadius: 5,
    margin: 5,
    backgroundColor: APP_COLORS.SECONDARY_COLOR.color,
  },
  property_label: {
    fontFamily: FONTS.bold,
  },
  price_item: {
    padding: 20,
    margin: 10,
    minHeight: Math.ceil(Dimensions.get("screen").height / 10),
    backgroundColor: APP_COLORS.WHITE_COLOR.color,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  price_label: {
    color: APP_COLORS.YELLOW_COLOR.color,
    fontFamily: FONTS.bold,
  },
  delete: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  ranking: {
    flex: 1,
    justifyContent: "center",
    marginTop: 25,
    flexDirection: "row",
  },
});

export const SELECT_MEDIAS_STYLE = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  top: {
    flex: 1,
  },
});

export const MAPS_STYLE = StyleSheet.create({
  input: {
    backgroundColor: APP_COLORS.WHITE_COLOR.color,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: APP_COLORS.SECONDARY_COLOR.color,
    borderRadius: 4,
    flexDirection: "row",
  },
  text: {
    flex: 1,
  },
});

export const UPDATE_PLACE_STYLE = StyleSheet.create({
  item_option: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    borderRadius: 50,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APP_COLORS.WHITE_COLOR.color
  },
});
