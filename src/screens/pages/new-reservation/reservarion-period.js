import { View, Text } from "react-native";
import React, { useContext } from "react";
import { NEW_ROOM_STYLE } from "../../../styling/rooms";
import NewReservationContext from "../../../config/contexts/new-reservation";
import CustomDatePickerRange from "../../../components/dates/custom-date-picker-range";

export default function ReservationPeriod({ onNext, onBack }) {
  const { newReservation, setNewReservation } = useContext(
    NewReservationContext
  );

  const onValidDate = (startDate, endDate, duration) => {
    try {
      setNewReservation({
        ...newReservation,
        startDate,
        endDate,
        duration,
      });
      onNext();
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <View style={NEW_ROOM_STYLE.container}>
      {/* <View style={NEW_ROOM_STYLE.header}>
        <Text style={NEW_ROOM_STYLE.title}>Durée de réservation</Text>
      </View> */}
       <CustomDatePickerRange
          onClose={() => console.log("close")}
          onBook={onValidDate}
          labelButton="Suivant"
        />
    </View>
  );
}
