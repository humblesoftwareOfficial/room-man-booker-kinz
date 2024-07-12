import { StyleSheet } from "react-native";
import { FONTS } from "./fonts";
import { APP_COLORS } from "./color";

export const RESERVATION_STYLING = StyleSheet.create({
  container: {},
  title: {},
  time: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center"
  },
  left_time: {
    flex: 1,

  },
  right_time: {
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "center"
  },
  left_time_text: {
    fontWeight: "bold",
    fontSize: 20
  }
});


export const RESERVATION_STYLE = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 19
  },
  message: {
    textAlign: "center",
    // fontSize: 19
  },
  form: {
    flex: 1,
  },
  duration: {
    flexDirection: "row",
    flexWrap: "wrap" ,
    margin: 10,
    justifyContent: "center",
  },
  duration_item: {
    padding: 10,
    borderWidth: 1,
    borderColor: APP_COLORS.PRIMARY_COLOR.color,
    borderRadius: 50
  },
  containerStatus: {
    marginTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  itemStatus: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 10,
    margin: 5,
  }
});
