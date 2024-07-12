import React, { useState, useMemo, useCallback } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { CalendarList } from "react-native-calendars";

import { formatDateToYYYYMMDD, formatInterValDate } from "../../utils/dates";
import { isFieldWithValue } from "../../utils/system";
import { APP_COLORS } from "../../styling/color";
import CustomButton from "../buttons/custom-button";

const ControlledDatePicker = ({
  onClose,
  onBook,
  labelButton = "Enregistrer",
  customTitle = "",
  minDate = null,
  addDays = 0,
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
      if (value_day >= today) {
        const start_date = new Date(minDate);
        const end_date = new Date(day.dateString);
        if (end_date <= start_date) {
          setStartDate(day.dateString);
          setSelectedDates(formatInterValDate(day.dateString, null));
        } else {
          setEndDate(day.dateString);
          setSelectedDates(formatInterValDate(start_date, day.dateString));
        }
      } else {
        // ShowToastMessage("", APP_COLORS.RED_COLOR.color, APP_COLORS.WHITE_COLOR.color)
        Alert.alert("", "Cette date est dépassée");
      }
    } catch (error) {}
  };

  const renderCalendar = useMemo(() => {
    const date = isFieldWithValue(minDate) ? new Date(minDate) : new Date();
    if (addDays) {
      date.setDate(date.getDate() + 1);
    }
    return (
      <CalendarList
        current={formatDateToYYYYMMDD(date, "-")}
        minDate={formatDateToYYYYMMDD(date, "-")}
        pastScrollRange={0}
        futureScrollRange={5}
        markedDates={selectedDates}
        onDayPress={handleDayPress}
        style={styles.calendar}
      />
    );
  }, [selectedDates]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>{customTitle}</Text>
      </View>
      <View style={{ flex: 1 }}>{renderCalendar}</View>
      <View style={styles.footer}>
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 1 }}>
          <CustomButton
            label={labelButton}
            disable={!isFieldWithValue(endDate)}
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

export default ControlledDatePicker;
