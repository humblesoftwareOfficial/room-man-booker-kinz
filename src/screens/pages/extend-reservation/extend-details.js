import { View, Text } from "react-native";
import React, { useContext } from "react";
import RequestCard from "../../../components/cards/request-card";
import ControlledDatePicker from "../../../components/dates/controlled-date-picker";
import NewReservationContext from "../../../config/contexts/new-reservation";

export default function ExtendDetails({ onNext, onBack, reservation, endDate }) {
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
    <View style={{ flex: 1 }}>
      <ControlledDatePicker
        onClose={() => console.log("close")}
        onBook={onValidDate}
        labelButton="Suivant"
        customTitle="Jusqu'au"
        minDate={endDate}
        addDays={1}
      />
    </View>
  );
}
