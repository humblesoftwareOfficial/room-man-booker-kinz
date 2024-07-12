import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useCallback, useContext } from "react";
import NewRoomContext from "../../../config/contexts/new-room";
import {
  ROOM_PROPERTIES,
  ROOM_PROPERTIES_TRADUCTION,
  getRoomPropertyIcon,
} from "../../../utils/rooms";
import { generateKey } from "../../../utils/system";
import { NEW_ROOM_STYLE } from "../../../styling/rooms";
import { APP_COLORS } from "../../../styling/color";
import CustomButton from "../../../components/buttons/custom-button";
import { ROOM_DETAILS_STYLING } from "../../../styling/cards";

export default function Properties({ onBack, onNext }) {
  const { newRoom, setNewRoom } = useContext(NewRoomContext);

  const renderProperties = useCallback(
    () =>
      Object.keys(ROOM_PROPERTIES).map((value, index) => (
        <TouchableOpacity
          key={generateKey()}
          style={[
            NEW_ROOM_STYLE.property_item,
            {
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: newRoom?.properties?.includes(
                ROOM_PROPERTIES[value]
              )
                ? APP_COLORS.YELLOW_COLOR.color
                : APP_COLORS.WHITE_COLOR.color,
            },
          ]}
          onPress={() => onSelectProperty(ROOM_PROPERTIES[value])}
        >
          <View style={[ROOM_DETAILS_STYLING.property_icon]}>
            <Text>
              {getRoomPropertyIcon(
                value,
                newRoom?.properties?.includes(ROOM_PROPERTIES[value])
                  ? APP_COLORS.BLACK_COLOR.color
                  : APP_COLORS.BLACK_COLOR.color,
                18
              )}
            </Text>
          </View>
          <Text
            style={[
              NEW_ROOM_STYLE.property_label,
              {
                color: newRoom?.properties?.includes(ROOM_PROPERTIES[value])
                  ? APP_COLORS.BLACK_COLOR.color
                  : APP_COLORS.BLACK_COLOR.color,
              },
            ]}
          >
            {ROOM_PROPERTIES_TRADUCTION[value]}
          </Text>
        </TouchableOpacity>
      )),
    [newRoom?.properties]
  );

  const onSelectProperty = (property) => {
    try {
      const selectedProperties = newRoom?.properties || [];
      const index = selectedProperties.indexOf(property);
      if (index === -1) {
        selectedProperties.push(property);
      } else {
        selectedProperties.splice(index, 1);
      }
      setNewRoom({
        ...newRoom,
        properties: selectedProperties,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <ScrollView style={NEW_ROOM_STYLE.container}>
      <View style={NEW_ROOM_STYLE.header}>
        <Text style={NEW_ROOM_STYLE.title}>Propriétès</Text>
      </View>
      <View>{renderProperties()}</View>
      <CustomButton
        label="Suivant"
        bgColor={APP_COLORS.PRIMARY_COLOR.color}
        textColor={APP_COLORS.WHITE_COLOR.color}
        onClick={onNext}
        disable={!newRoom?.properties?.length}
      />
    </ScrollView>
  );
}
