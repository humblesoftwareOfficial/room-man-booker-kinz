import React, { useContext, useState } from "react";
import { View, Button, Platform, Text, StyleSheet } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
import NewReservationContext from "../../../config/contexts/new-reservation";
import { RESERVATION_STYLING } from "../../../styling/reservation";
import {
  convertDateStringFormat,
  isValidHour,
  isValidMinute,
} from "../../../utils/dates";
import DefaultInput from "../../../components/inputs/default-input";
import { isFieldWithValue } from "../../../utils/system";
import { NEW_ROOM_STYLE } from "../../../styling/rooms";
import CustomButton from "../../../components/buttons/custom-button";
import { APP_COLORS } from "../../../styling/color";

const ExtendTime = ({ onNext, onBack }) => {
  const { newReservation, setNewReservation } = useContext(
    NewReservationContext
  );

  const renderStartTime = () => (
    <View style={RESERVATION_STYLING.time}>
      <View style={RESERVATION_STYLING.left_time}>
        <Text style={RESERVATION_STYLING.left_time_text}>
          {convertDateStringFormat(newReservation?.startDate)}
        </Text>
      </View>
      <View style={RESERVATION_STYLING.right_time}>
        <DefaultInput
          placeholder="mm"
          onValueChange={(timeStartMinute) =>
            setNewReservation({ ...newReservation, timeStartMinute })
          }
          value={newReservation?.timeStartMinute || ""}
          textAlignCenter
          keyboardType="numeric"
          maxLength={2}
        />
        <Text>:</Text>
        <DefaultInput
          placeholder="HH"
          onValueChange={(timeStartHour) =>
            setNewReservation({ ...newReservation, timeStartHour })
          }
          value={newReservation?.timeStartHour || ""}
          textAlignCenter
          keyboardType="numeric"
          maxLength={2}
        />
      </View>
    </View>
  );

  const renderEndTime = () => (
    <View style={RESERVATION_STYLING.time}>
      <View style={RESERVATION_STYLING.left_time}>
        <Text style={RESERVATION_STYLING.left_time_text}>
          {isFieldWithValue(newReservation?.endDate)
            ? convertDateStringFormat(newReservation?.endDate)
            : convertDateStringFormat(newReservation?.startDate)}
        </Text>
      </View>
      <View style={RESERVATION_STYLING.right_time}>
        <DefaultInput
          placeholder="mm"
          onValueChange={(timeEndMinute) =>
            setNewReservation({ ...newReservation, timeEndMinute })
          }
          value={newReservation?.timeEndMinute || ""}
          textAlignCenter
          keyboardType="numeric"
          maxLength={2}
        />
        <Text>:</Text>
        <DefaultInput
          placeholder="HH"
          onValueChange={(timeEndHour) =>
            setNewReservation({ ...newReservation, timeEndHour })
          }
          value={newReservation?.timeEndHour || ""}
          textAlignCenter
          keyboardType="numeric"
          maxLength={2}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={NEW_ROOM_STYLE.header}>
        <Text style={NEW_ROOM_STYLE.title}>Heures de fin</Text>
      </View>
      {renderEndTime()}
      <CustomButton
        label="Suivant"
        bgColor={APP_COLORS.PRIMARY_COLOR.color}
        textColor={APP_COLORS.WHITE_COLOR.color}
        onClick={onNext}
        disable={
          !isFieldWithValue(newReservation?.timeEndHour) ||
          !isFieldWithValue(newReservation?.timeEndMinute) ||
          !isValidHour(newReservation?.timeEndHour) ||
          !isValidMinute(newReservation?.timeEndMinute)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  text: {
    marginTop: 20,
    fontSize: 20,
  },
});

export default ExtendTime;
