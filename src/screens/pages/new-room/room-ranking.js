import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React, { useState, useCallback, useContext } from "react";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import NewRoomContext from "../../../config/contexts/new-room";
import { APP_COLORS } from "../../../styling/color";
import { NEW_ROOM_STYLE } from "../../../styling/rooms";
import CustomButton from "../../../components/buttons/custom-button";
import { generateKey } from "../../../utils/system";

const STAR_WIDTH = Math.ceil(Dimensions.get("window").width / 7);

export default function RoomRanking({ onNext, onBack }) {
  const { newRoom, setNewRoom } = useContext(NewRoomContext);
  const [star, setStar] = useState(newRoom?.star || 0);

  const renderStars = useCallback(
    () =>
      [1, 2, 3, 4, 5].map((value, _index) => (
        <TouchableOpacity
          key={generateKey()}
          style={{ margin: 5 }}
          onPress={() => onUpdateStars(value)}
        >
          {value <= star ? (
            // <Ionicons
            //   name="md-star-sharp"
            //   size={STAR_WIDTH}
            //   color={APP_COLORS.YELLOW_COLOR.color}
            // />
            <FontAwesome name="star" size={STAR_WIDTH}
            color={APP_COLORS.YELLOW_COLOR.color} />
          ) : (
            // <Ionicons
            //   name="md-star-outline"
            //   size={STAR_WIDTH}
            //   color={APP_COLORS.PRIMARY_COLOR.color}
            // />
            <AntDesign name="staro" size={STAR_WIDTH}
            color={APP_COLORS.PRIMARY_COLOR.color} />
          )}
        </TouchableOpacity>
      )),
    [newRoom?.star]
  );

  const onUpdateStars = (value) => {
    try {
      setStar(value);
      setNewRoom({
        ...newRoom,
        star: value,
      });
    } catch (error) {}
  };
  return (
    <View style={NEW_ROOM_STYLE.container}>
      <View style={NEW_ROOM_STYLE.header}>
        <Text style={NEW_ROOM_STYLE.title}>Noter la pièce</Text>
      </View>
      <View style={NEW_ROOM_STYLE.ranking}>{renderStars()}</View>
      <CustomButton
        label="Enregistrer"
        textColor={APP_COLORS.WHITE_COLOR.color}
        bgColor={APP_COLORS.PRIMARY_COLOR.color}
        onClick={onNext}
      />
    </View>
  );
}
