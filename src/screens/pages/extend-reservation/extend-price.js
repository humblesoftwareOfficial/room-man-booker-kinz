import { View, Text } from "react-native";
import React, { useContext, useMemo } from "react";
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

export default function ExtendPrice({ onNext, onBack, oldPrice = 0 }) {
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

  const totalSum = useMemo(() => {
    const old = +oldPrice;
    const newPrice = isFieldWithValue(newReservation?.price) ? +newReservation?.price : 0;
    return old + newPrice;
  }, [newReservation?.price]);

  return (
    <View style={NEW_ROOM_STYLE.container}>
      <View style={NEW_ROOM_STYLE.header}>
        <Text style={NEW_ROOM_STYLE.title}>
          Montant à ajouter à la réservation
        </Text>
      </View>
      <View>
        {/* <DefaultInput
          value={formatPrice(`${oldPrice}`)}
          placeholder="Montant"
          autoCompleteType=""
          keyboardType="numeric"
          isForPricing
          textAlignCenter
          editable={false}
          prefix={<Text>Ancien prix</Text>}
          withPrefix
        /> */}
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
        <View style={{ margin: 15 }}>
          <Text>Le nouveau montant total de la réservation est de: </Text>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            {formatPrice(`${totalSum}`)}
          </Text>
        </View>
        <CustomButton
          label="Valider la prolongation"
          bgColor={APP_COLORS.PRIMARY_COLOR.color}
          textColor={APP_COLORS.WHITE_COLOR.color}
          onClick={onNext}
          disable={!isFieldWithValue(newReservation?.price)}
        />
      </View>
    </View>
  );
}
