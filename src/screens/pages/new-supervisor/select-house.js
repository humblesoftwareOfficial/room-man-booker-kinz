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
import UserContext from "../../../config/contexts/user";

export default function SelectHouse({ onBack, onNext, houses = [] }) {
  const { newSupervisor, setNewSupervisor } = useContext(UserContext);

  const renderHouses = useCallback(
    () =>
      houses?.map((house, index) => (
        <TouchableOpacity
          key={generateKey()}
          style={[
            NEW_ROOM_STYLE.property_item,
            {
              backgroundColor:
                house.code === newSupervisor?.house
                  ? APP_COLORS.YELLOW_COLOR.color
                  : APP_COLORS.WHITE_COLOR.color,
            },
          ]}
          onPress={() => onSelectHouse(house.code)}
        >
          <Text
            style={[
              NEW_ROOM_STYLE.property_label,
              {
                color:
                  house.code === newSupervisor?.house
                    ? APP_COLORS.BLACK_COLOR.color
                    : APP_COLORS.BLACK_COLOR.color,
              },
            ]}
          >
            {house.name}
          </Text>
        </TouchableOpacity>
      )),
    [newSupervisor?.house]
  );

  const onSelectHouse = (house) => {
    try {
      setNewSupervisor({
        ...newSupervisor,
        house,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <ScrollView style={NEW_ROOM_STYLE.container}>
      <View style={NEW_ROOM_STYLE.header}>
        <Text style={NEW_ROOM_STYLE.title}>Maison</Text>
      </View>
      <View>{renderHouses()}</View>
      <CustomButton
        label="Ajouter"
        bgColor={APP_COLORS.GREEN_COLOR.color}
        textColor={APP_COLORS.WHITE_COLOR.color}
        onClick={onNext}
        disable={!isFieldWithValue(newSupervisor?.house)}
      />
    </ScrollView>
  );
}
