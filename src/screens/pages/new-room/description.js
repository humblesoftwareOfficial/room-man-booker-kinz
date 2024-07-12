import { View, Text } from "react-native";
import React, { useContext } from "react";
import NewRoomContext from "../../../config/contexts/new-room";
import { isFieldWithValue } from "../../../utils/system";
import { APP_COLORS } from "../../../styling/color";
import CustomButton from "../../../components/buttons/custom-button";
import DefaultInput from "../../../components/inputs/default-input";
import { NEW_ROOM_STYLE } from "../../../styling/rooms";

export default function Description({ onNext, onBack }) {
  const { newRoom, setNewRoom } = useContext(NewRoomContext);
  return (
    <View style={NEW_ROOM_STYLE.container}>
      <View style={NEW_ROOM_STYLE.header}>
        <Text style={NEW_ROOM_STYLE.title}>Description de la pièce</Text>
      </View>
      <View>
        <DefaultInput
          placeholder="Faites une description de la pièce ...."
          multiLine
          numberOfLines={4}
          onValueChange={(description) =>
            setNewRoom({ ...newRoom, description })
          }
          value={newRoom?.description || ""}
        />
        <CustomButton
          label="Suivant"
          bgColor={APP_COLORS.PRIMARY_COLOR.color}
          textColor={APP_COLORS.WHITE_COLOR.color}
          onClick={onNext}
          disable={!isFieldWithValue(newRoom?.description)}
        />
        <CustomButton
          label="Annuler"
          textColor={APP_COLORS.RED_COLOR.color}
          onClick={onBack}
          bgColor="transparent"
        />
      </View>
    </View>
  );
}
