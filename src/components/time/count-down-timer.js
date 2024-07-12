import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { calculateTimeDifference } from "../../utils/dates";

const CountdownTimer = ({ endDate }) => {
  const [timeDifference, setTimeDifference] = useState(
    calculateTimeDifference(endDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDifference(calculateTimeDifference(endDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  const displayOrNot = (value = 0, text = "") => (
    value ? text : ""
  )

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {timeDifference.isPast
          ? `Réservation terminée depuis ${timeDifference.days} jours, ${timeDifference.hours} heures, ${timeDifference.minutes} minutes et ${timeDifference.seconds} secondes.`
          : `Termine dans ${displayOrNot(timeDifference.days, `${timeDifference.days} jours,`)} ${displayOrNot(timeDifference.hours, `${timeDifference.hours} heures,`)} ${displayOrNot(timeDifference.minutes, `${timeDifference.minutes} minutes et`)} ${displayOrNot(timeDifference.seconds, `${timeDifference.seconds} secondes.`)}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 5
  },
  text: {
    // fontSize: 20,
    // fontWeight: "bold",
  },
});

export default React.memo(CountdownTimer);
