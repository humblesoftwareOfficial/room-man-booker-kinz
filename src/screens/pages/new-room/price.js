import React, { useContext, useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import NewRoomContext from "../../../config/contexts/new-room";
import { NEW_ROOM_STYLE } from "../../../styling/rooms";
import { APP_COLORS } from "../../../styling/color";
import { formatPrice, generateKey } from "../../../utils/system";
import CustomButton from "../../../components/buttons/custom-button";
import DefaultModal from "../../../components/modals/default-modal";
import NewPriceItem from "./new-price-item";

export default function Price({ onNext, onBack }) {
  const { newRoom, setNewRoom } = useContext(NewRoomContext);
  const [openModal, setOpenModal] = useState(false);

  const renderNewPriceItem = () => (
    <TouchableOpacity
      style={NEW_ROOM_STYLE.price_item}
      onPress={() => setOpenModal(true)}
    >
      <Text>{" <--  Ajouter un prix --> "}</Text>
    </TouchableOpacity>
  );

  const onAddPrice = (value) => {
    try {
      setOpenModal(false);
      const prices = newRoom?.prices || [];
      const index = prices.findIndex(
        (o) => o.description === value.description
      );
      if (index !== -1) {
        prices.splice(index, 1);
      }
      prices.push(value);
      setNewRoom({ ...newRoom, prices });
    } catch (error) {
      console.log({ error });
    }
  };

  const removePriceItem = (value) => {
    try {
      const prices = newRoom?.prices || [];
      const index = prices.findIndex(
        (o) => o.description === value.description
      );
      if (index !== -1) {
        prices.splice(index, 1);
      }
      setNewRoom({ ...newRoom, prices });
    } catch (error) {}
  };

  const renderPrices = useCallback(() =>
    newRoom?.prices?.map((item, index) => (
      <View
        style={[
          NEW_ROOM_STYLE.price_item,
          {
            backgroundColor: APP_COLORS.YELLOW_COLOR.color,
          },
        ]}
        key={generateKey()}
      >
        <Text style={[NEW_ROOM_STYLE.price_label, {
          color: APP_COLORS.BLACK_COLOR.color
        }]}>
          {formatPrice(`${item.value}`)}
        </Text>
        <View style={{ marginTop: 5 }}>
          <Text style={[NEW_ROOM_STYLE.price_label, {
          color: APP_COLORS.BLACK_COLOR.color
        }]}>{item.description}</Text>
        </View>
        <TouchableOpacity
          style={NEW_ROOM_STYLE.delete}
          onPress={() => removePriceItem(item)}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
    ))
  );
  return (
    <ScrollView style={NEW_ROOM_STYLE.container}>
      <View style={NEW_ROOM_STYLE.header}>
        <Text style={NEW_ROOM_STYLE.title}>Prix</Text>
      </View>
      {renderPrices()}
      {renderNewPriceItem()}
      <DefaultModal
        show={openModal}
        onClose={() => setOpenModal(false)}
        backgroundColor={APP_COLORS.PRIMARY_COLOR.color}
        paddingHorizontal={0}
        content={
          <NewPriceItem
            onAbort={() => setOpenModal(false)}
            onCreate={onAddPrice}
          />
        }
      />
      <CustomButton
        label="Suivant"
        bgColor={APP_COLORS.PRIMARY_COLOR.color}
        textColor={APP_COLORS.WHITE_COLOR.color}
        onClick={onNext}
        disable={!newRoom?.prices?.length}
      />
    </ScrollView>
  );
}
