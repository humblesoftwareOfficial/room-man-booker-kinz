import React, { useState, useMemo, useCallback } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { CalendarList } from "react-native-calendars";

import {
  EReservationDuration,
  formatDateToYYYYMMDD,
  formatInterValDate,
} from "../../utils/dates";
import { generateKey, isFieldWithValue } from "../../utils/system";
import { RESERVATION_STYLE } from "../../styling/reservation";
import { APP_COLORS } from "../../styling/color";
import CustomButton from "../buttons/custom-button";


const CustomDatePickerRangeFilter = ({
  onClose,
  onBook,
  labelButton = "Filtrer",
  customTitle = "Choisir une date",
  hideDuration = false,
  withPastDateExclusion = false,
}) => {
  const [selectedDates, setSelectedDates] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [duration, setDuration] = useState("");

  const handleDayPress = (day) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const value_day = new Date(day.dateString);
    //   if (value_day >= today) {
        if (startDate && endDate) {
          setEndDate(null);
          setStartDate(day.dateString);
          setSelectedDates(formatInterValDate(day.dateString, null));
        } else {
          if (startDate) {
            const start_date = new Date(startDate);
            const end_date = new Date(day.dateString);
            if (end_date <= start_date) {
              setStartDate(day.dateString);
              setSelectedDates(formatInterValDate(day.dateString, null));
            } else {
              setEndDate(day.dateString);
              setSelectedDates(formatInterValDate(startDate, day.dateString));
            }
          } else {
            setStartDate(day.dateString);
            setSelectedDates(formatInterValDate(day.dateString, null));
          }
        }
    //   } 
    //   else {
    //     // ShowToastMessage("", APP_COLORS.RED_COLOR.color, APP_COLORS.WHITE_COLOR.color)
    //     Alert.alert("", "Cette date est dépassée");
    //   }
    } catch (error) {}
  };

  const renderCalendar = useMemo(
    () => (
      <CalendarList
        current={formatDateToYYYYMMDD(new Date(), "-")}
        minDate={!withPastDateExclusion ? formatDateToYYYYMMDD(new Date(), "-") : null}
        // maxDate={formatDateToYYYYMMDD(new Date(), "-")}
        // pastScrollRange={0}
        futureScrollRange={0}
        markedDates={selectedDates}
        onDayPress={handleDayPress}
        style={styles.calendar}
        firstDay={1}
      />
    ),
    [selectedDates]
  );

  const renderDuration = useCallback(
    () =>
      Object.keys(EReservationDuration).map((value, _index) => (
        <TouchableOpacity
          style={[
            RESERVATION_STYLE.duration_item,
            {
              marginRight: 10,
              backgroundColor: isSelectedDuration(value)
                ? APP_COLORS.YELLOW_COLOR.color
                : "transparent",
              borderWidth: isSelectedDuration(value) ? 0 : 1,
              marginBottom: 5,
            },
          ]}
          key={generateKey()}
          nativeID={generateKey()}
          onPress={() => onSelectDuration(value)}
        >
          <Text
            style={{ fontSize: 10 }}
          >{`${EReservationDuration[value]}`}</Text>
        </TouchableOpacity>
      )),
    [duration]
  );

  const onSelectDuration = (value) => {
    setDuration(value);
  };

  const isSelectedDuration = (value) => value === duration;

  return (
    <View style={{ flex: 1, marginTop: 15 }}>
      <View style={styles.header}>
        <Text style={styles.title}>{customTitle}</Text>
        {!hideDuration && (
          <View style={RESERVATION_STYLE.duration}>{renderDuration()}</View>
        )}
      </View>
      <View style={{ flex: 1 }}>{renderCalendar}</View>
      <View style={styles.footer}>
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 1 }}>
          <CustomButton
            label={labelButton}
            disable={!isFieldWithValue(startDate)}
            bgColor={APP_COLORS.PRIMARY_COLOR.color}
            onClick={() => onBook(startDate, endDate, duration)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendar: {
    // height: 400, // Adjust the height as needed
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
  },
  header: {
    // marginTop: 10,
    // padding: 10,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: APP_COLORS.LIGHT_COLOR.color,
  },
  close: {
    position: "absolute",
    right: 20,
    bottom: 0,
    top: 0,
  },
  footer: {
    padding: 5,
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: APP_COLORS.LIGHT_COLOR.color,
  },
});

export default CustomDatePickerRangeFilter;
