import { EvilIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { APP_COLORS } from "../../styling/color";
import { isFieldWithValue } from "../../utils/system";


const DEFAULT_WIDTH = Dimensions.get("window").width / 2 - 10;

export default function ImageRoomPicker({
  width = DEFAULT_WIDTH,
  height = DEFAULT_WIDTH,
  code,
  uri,
  onImagePick,
  managedPick = false,
  onClick,
  borderRadius = 15,
}) {
  const [defaultURI, setUri] = useState(
    "https://res.cloudinary.com/faceshop/image/upload/v1623670095/default_eadihe.jpg"
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.5,
      base64: true,
    });
    /// console.log({ result })
    if (!result.canceled) {
      onImagePick(result, code);
    }
  };
  return (
    <TouchableOpacity
      onPress={() => {
        managedPick ? onClick() : pickImage();
      }}
    >
      <View
        style={[
          styles.container,
          {
            width,
            height,
            borderRadius,
          },
        ]}
      >
        <View
          style={{
            flex: 1,
            ...(!isFieldWithValue(uri) && {
              justifyContent: "center",
              alignItems: "center",
            }),
          }}
        >
          {isFieldWithValue(uri) ? (
            <Image
              style={[styles.backgroundImage, { borderRadius }]}
              source={{
                uri: uri || defaultURI,
              }}
            ></Image>
          ) : (
            <EvilIcons name="image" size={width / 2}
            color={APP_COLORS.PRIMARY_COLOR.color} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    borderWidth: 1,
    borderColor: "rgba(207, 207, 207, 0.6)",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  bottom: {
    padding: 5,
    backgroundColor: "#353535",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  }
});
