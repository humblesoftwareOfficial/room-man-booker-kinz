import { Dimensions, StyleSheet } from "react-native";
import { APP_COLORS } from "./color";
import { FONTS } from "./fonts";

const IMAGE_CARD_HEIGHT = Math.ceil(Dimensions.get("window").height / 3.5);
const USER_REQUEST_PROFILE = Math.ceil(Dimensions.get("window").height / 17);
const QUICK_RECAP_CARD_SIZE = Math.ceil(Dimensions.get("window").width / 2);

export const ROOM_CARD_STYLING = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    backgroundColor: APP_COLORS.WHITE_COLOR.color,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#D9E1F0",
  },
  image: {
    height: IMAGE_CARD_HEIGHT,
    backgroundColor: "#FFF",
    borderRadius: 25,
  },
  image_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infos: {
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10,
    // color: APP_COLORS.SECONDARY_COLOR.color
  },
  description: {
    // color: APP_COLORS.PRIMARY_COLOR.color
  },
  status: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginTop: 10,
  },
  status_text: {
    fontSize: 9,
    marginRight: 5,
  },
  price: {
    fontWeight: "bold",
    color: APP_COLORS.PRIMARY_COLOR.color,
  },
});

export const CARD_MEDIA_LIST_STYLING = StyleSheet.create({
  container: {
    height: Math.ceil(Dimensions.get("window").height / 2.5),
    backgroundColor: APP_COLORS.LIGHT_COLOR.color,
    borderRadius: 7,
  },
  item_media: {
    width: Math.ceil(Dimensions.get("window").width / 11),
    height: Math.ceil(Dimensions.get("window").width / 11),
    margin: 5,
    borderRadius: 50,
    backgroundColor: APP_COLORS.LIGHT_COLOR.color,
  },
  footer_media: {
    marginTop: 5,
  },
  container_footer_medias: {
    marginTop: 0,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export const ROOM_DETAILS_STYLING = StyleSheet.create({
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
  section: {
    flexDirection: "row",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  house_name: {
    color: APP_COLORS.WHITE_COLOR.color,
    fontWeight: "bold",
    fontSize: 17,
  },
  property: {
    padding: 5,
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 0,
    // flexDirection: "row",
    alignItems: "center",
  },
  property_icon: {
    padding: 5,
    margin: 3,
    backgroundColor: APP_COLORS.WHITE_COLOR.color,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  property_label: {
    flex: 1,
  },
  reservation_user: {
    fontWeight: "bold",
    fontSize: 10,
  },
});

export const REQUEST_STYLING = StyleSheet.create({
  header: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  title_header: {
    flex: 1,
    flexDirection: "row-reverse",
    marginRight: 10,
  },
});

export const REQUEST_CARD_STYLING = StyleSheet.create({
  container: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: APP_COLORS.WHITE_COLOR.color,
    borderWidth: 1,
    borderColor: "#D9E1F0",
  },
  top: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  user_profile: {
    width: USER_REQUEST_PROFILE,
    height: USER_REQUEST_PROFILE,
    borderRadius: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  user_infos: {
    flex: 1,
    marginLeft: 5,
  },
  user_infos_bold: {
    fontWeight: "bold",
  },
  time: {
    // backgroundColor: APP_COLORS.YELLOW_COLOR.color,
    padding: 5,
    flexDirection: "row-reverse",
  },
  createdAt: {
    fontSize: 10,
  },
  reservationInterval: {
    // fontWeight: "bold",
    fontSize: 10,
  },
  timeTag: {
    // backgroundColor: APP_COLORS.YELLOW_COLOR.color,
    // padding: 5,
    // borderRadius: 50
  },
});

export const QUICK_RECAP_CARD_STYLING = StyleSheet.create({
  container: {
    marginLeft: 7,
    marginRight: 7,
    padding: 5,
    width: QUICK_RECAP_CARD_SIZE,
    height: QUICK_RECAP_CARD_SIZE,
    borderRadius: 5,
    shadowColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  section: {
    flex: 1,
    padding: 5,
  },
  label: {
    // fontWeight: "bold",
    textAlign: "center"
  },
  count: {
    fontWeight: "bold",
    fontSize: 36,
    textAlign: "center",
  },
});
