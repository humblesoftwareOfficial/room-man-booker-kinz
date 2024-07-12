import { Dimensions, StyleSheet } from "react-native";
import { APP_COLORS } from "./color";

export const RADIUS = Math.ceil(Dimensions.get("window").width / 10);
export const RECAP_RESERVATION_SIZE = Math.ceil(Dimensions.get("window").width / 6);

export const ANALYTICS_STYLING = StyleSheet.create({
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
  container: {
    // flex: 1,
    backgroundColor: APP_COLORS.PRIMARY_COLOR.color,
    borderRadius: RADIUS,
    margin: 5
  },
  ca_value_card: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: "#3A5053",
    borderRadius: RADIUS,
  },
  ca_value: {
    fontWeight: "bold",
    color: APP_COLORS.WHITE_COLOR.color,
    textAlign: "center",
    fontSize: 24
  },
  ca_value_label: {
    // fontWeight: "bold",
    color: APP_COLORS.YELLOW_COLOR.color,
    textAlign: "center",
    // fontSize: 24
  },
  title: {
    textAlign: "center"
  },
  reservation_container: {
    flexDirection: "row",
    margin: 5,
    padding: 5,
  },
  reservation_recap_item: {
    flex: 1,
    padding: 5,
    // backgroundColor: "black",
    margin: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  reservation_recap_item_circle: {
    width: RECAP_RESERVATION_SIZE,
    height: RECAP_RESERVATION_SIZE,
    backgroundColor: "red",
    borderRadius: RECAP_RESERVATION_SIZE,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5
  },
  small_text: {
    fontSize: 10
  }
})