import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useCallback, useContext } from "react";
import NewRoomContext from "../../../config/contexts/new-room";
import { NEW_ROOM_STYLE } from "../../../styling/rooms";
import { APP_COLORS } from "../../../styling/color";
import CustomButton from "../../../components/buttons/custom-button";
import {
  ERoomTypes,
  generateKey,
  isFieldWithValue,
} from "../../../utils/system";

export default function RoomType({ onBack, onNext }) {
  const { newRoom, setNewRoom } = useContext(NewRoomContext);

  const renderRoomTypes = useCallback(
    () =>
      Object.keys(ERoomTypes).map((value, index) => (
        <TouchableOpacity
          key={generateKey()}
          style={[
            NEW_ROOM_STYLE.property_item,
            {
              backgroundColor:
                value === newRoom?.type
                  ? APP_COLORS.YELLOW_COLOR.color
                  : APP_COLORS.WHITE_COLOR.color,
            },
          ]}
          onPress={() => onSelectPlaceType(value)}
        >
          <Text
            style={[
              NEW_ROOM_STYLE.property_label,
              {
                color:
                  value === newRoom?.type
                    ? APP_COLORS.BLACK_COLOR.color
                    : APP_COLORS.PRIMARY_COLOR.color,
              },
            ]}
          >
            {ERoomTypes[value]}
          </Text>
        </TouchableOpacity>
      )),
    [newRoom?.type]
  );

  const onSelectPlaceType = (type) => {
    try {
      setNewRoom({
        ...newRoom,
        type,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <ScrollView style={NEW_ROOM_STYLE.container}>
      <View style={NEW_ROOM_STYLE.header}>
        <Text style={NEW_ROOM_STYLE.title}>Type de pièce</Text>
      </View>
      <View>{renderRoomTypes()}</View>
      <CustomButton
        label="Suivant"
        bgColor={APP_COLORS.PRIMARY_COLOR.color}
        textColor={APP_COLORS.WHITE_COLOR.color}
        onClick={onNext}
        disable={!isFieldWithValue(newRoom?.type)}
      />
    </ScrollView>
  );
}
