import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NEW_ROOM_STYLE } from "../../../styling/rooms";
import { SAFE_AREA_VIEW } from "../../../styling/screens";
import DefaultInput from "../../../components/inputs/default-input";
import { APP_COLORS } from "../../../styling/color";
import CustomButton from "../../../components/buttons/custom-button";
import { ERoomPriceDescription, formatPrice, generateKey, isFieldWithValue, onlyContainsNumber } from "../../../utils/system";

export default function NewPriceItem({ onCreate, onAbort }) {
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handlePrice = (newValue = "") => {
    const _price = newValue?.replace(/ /g, "");
    if (onlyContainsNumber(_price) || _price?.length === 0) {
      setPrice(_price);
    }
  };

  const renderPlacePriceDescription = useCallback(
    () =>
      Object.keys(ERoomPriceDescription).map((value, index) => (
        <TouchableOpacity
          key={generateKey()}
          style={[
            NEW_ROOM_STYLE.property_item,
            {
              backgroundColor:
                ERoomPriceDescription[value] === description
                  ? APP_COLORS.YELLOW_COLOR.color
                  : APP_COLORS.WHITE_COLOR.color,
            },
          ]}
          onPress={() =>
            onSelectPlacePriceDescription(ERoomPriceDescription[value])
          }
        >
          <Text
            style={[
              NEW_ROOM_STYLE.property_label,
              {
                color:
                  ERoomPriceDescription[value] === description
                    ? APP_COLORS.BLACK_COLOR.color
                    : APP_COLORS.BLACK_COLOR.color,
              },
            ]}
          >
            {ERoomPriceDescription[value]}
          </Text>
        </TouchableOpacity>
      )),
    [description]
  );

  const onSelectPlacePriceDescription = (value) => {
    try {
      setDescription(value);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <SafeAreaView style={[SAFE_AREA_VIEW.container, SAFE_AREA_VIEW.marginTopIOS]} edges={["right", "left", "top"]}>
      <ScrollView style={NEW_ROOM_STYLE.container}>
        <View style={NEW_ROOM_STYLE.header}>
          <Text style={NEW_ROOM_STYLE.title}>Définir un prix</Text>
        </View>
        <DefaultInput
          value={formatPrice(`${price}` || "")}
          placeholder="Montant"
          onValueChange={(newValue) => handlePrice(newValue)}
          autoCompleteType=""
          keyboardType="numeric"
          isForPricing
          textAlignCenter
          maxLength={8}
        />
        <View>{renderPlacePriceDescription()}</View>
        <CustomButton
          label="Ajouter"
          bgColor={APP_COLORS.PRIMARY_COLOR.color}
          textColor={APP_COLORS.WHITE_COLOR.color}
          onClick={() => onCreate({ value: price, description, devise: 'FCFA' })}
          disable={!isFieldWithValue(price) || !isFieldWithValue(description)}
        />
        <CustomButton
          label="Annuler"
          textColor={APP_COLORS.RED_COLOR.color}
          onClick={onAbort}
          bgColor="transparent"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
