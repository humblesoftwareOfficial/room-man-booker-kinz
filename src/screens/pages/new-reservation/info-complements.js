import { View, Text } from "react-native";
import React, { useContext } from "react";
import { NEW_ROOM_STYLE } from "../../../styling/rooms";
import DefaultInput from "../../../components/inputs/default-input";
import NewReservationContext from "../../../config/contexts/new-reservation";
import {
  formatPrice,
  isFieldWithValue,
  onlyContainsNumber,
} from "../../../utils/system";
import CustomButton from "../../../components/buttons/custom-button";
import { APP_COLORS } from "../../../styling/color";

export default function InfoComplements({ onNext, onBack }) {
  const { newReservation, setNewReservation } = useContext(
    NewReservationContext
  );

  const handlePrice = (newValue = "") => {
    const _price = newValue?.replace(/ /g, "");
    if (onlyContainsNumber(_price) || _price?.length === 0) {
      setNewReservation({
        ...newReservation,
        price: _price,
      });
    }
  };
  return (
    <View style={NEW_ROOM_STYLE.container}>
      <View style={NEW_ROOM_STYLE.header}>
        <Text style={NEW_ROOM_STYLE.title}>Informations complémentaires</Text>
      </View>
      <View>
        <DefaultInput
          placeholder="Identification (cni, passeport)"
          onValueChange={(identification) =>
            setNewReservation({ ...newReservation, identification })
          }
          value={newReservation?.identification || ""}
        />
        <DefaultInput
          value={
            newReservation?.price ? formatPrice(`${newReservation?.price}`) : ""
          }
          placeholder="Montant"
          onValueChange={(newValue) => handlePrice(newValue)}
          autoCompleteType=""
          keyboardType="numeric"
          isForPricing
          textAlignCenter
          maxLength={8}
        />
        <CustomButton
          label="Suivant"
          bgColor={APP_COLORS.PRIMARY_COLOR.color}
          textColor={APP_COLORS.WHITE_COLOR.color}
          onClick={onNext}
          disable={
            // !isFieldWithValue(newReservation?.identification) ||
            !isFieldWithValue(newReservation?.price)
          }
        />
      </View>
    </View>
  );
}
