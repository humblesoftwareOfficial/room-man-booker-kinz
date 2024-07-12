import { Dimensions, StyleSheet } from "react-native";

export const RADIUS_HEIGHT = Math.ceil(Dimensions.get("window").width / 50);

export const TAB_BAR_STYLE = StyleSheet.create({
  main: {
    alignItems: "center",
    // margin: 5,
    marginLeft: 5,
    marginRight: 5
  },
  over_container: {
    // borderRadius: RADIUS_HEIGHT,
    borderBottomWidth: 1.5,
    margin: 2,
  },
  container: {
    padding: 8,
    margin: 5,
    borderRadius: RADIUS_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  pseudo: {
    fontSize: 12,
    color: "#FFF",
  },
  tab_name: {
    marginTop: 3,
    fontSize: 9,
    color: "white",
  },
});
