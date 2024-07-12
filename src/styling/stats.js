import { Dimensions, StyleSheet } from "react-native";
import { FONTS } from "./fonts";
import { APP_COLORS } from "./color";

export const ICON_VALUES_SIZE = Math.ceil(Dimensions.get('screen').width / 7);

export const STATS_STYLING = StyleSheet.create({
  progress_bar: {
    marginTop: 15,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: APP_COLORS.WHITE_COLOR.color
  },
  recap_cards_section: {
    padding: 15,
    margin: 2,
    marginBottom: 15,
    // flexDirection: "row",
  },
  recap_item: {
    flex: 1,
    margin: 5,
    borderRadius: 5,
    minHeight: Math.ceil(Dimensions.get('screen').width / 3),
    padding: 10,
    flexDirection: "row"
  },
  stat_value: {
    // fontFamily: FONTS.bold,
    // fontSize: 13,
    fontWeight: "bold",
    textAlign: "center"
  },
  stat_desc: {
    textAlign: "center"
  },
  ca: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  values: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  left_values: {
    flexDirection: "row",
    alignItems: "center"
  },
  icon_values: {
    width: ICON_VALUES_SIZE,
    height: ICON_VALUES_SIZE,
    borderRadius: 500,
    backgroundColor: APP_COLORS.WHITE_COLOR.color,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5
  },
  right_values: {
    flex: 1,
    // flexDirection: "row-reverse",
    marginLeft: 5,
    padding: 5,
    borderRadius: 15
  },
  label_values: {
    // fontSize: 10
  },
  title_section: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    textAlign: "center"
  },
  see_more: {
    padding: 10,
    backgroundColor: APP_COLORS.BLACK_COLOR.color,
    margin: 10,
    borderRadius: 50,
  },
  see_more_text: {
    color: APP_COLORS.WHITE_COLOR.color
  }
});


