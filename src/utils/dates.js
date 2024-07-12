import { APP_COLORS } from "../styling/color";
import { isFieldWithValue, onlyContainsNumber } from "./system";

export const formatDateToYYYYMMDD = (date, separator = '/') => {
  try {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}${separator}${month}${separator}${day}`;
  } catch (error) {
    return "";
  }
};

export const formatDateToDDMMYYYY = (date) => {
  try {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    if (!day || !year || !month) return "-";
    return `${day}/${month}/${year}`;
  } catch (error) {
    return "";
  }
};

export const formatInterValDate = (startDate = null, endDate = null) => {
  try {
    if (startDate && endDate) {
      const start_date = new Date(startDate);
      const end_date = new Date(endDate);
      const intervals = {};
      intervals[`${startDate}`] = {
        selected: true,
        marked: true,
        selectedColor: APP_COLORS.PRIMARY_COLOR.color,
        dotColor: APP_COLORS.YELLOW_COLOR.color,
      };
      intervals[`${endDate}`] = {
        selected: true,
        marked: true,
        selectedColor: APP_COLORS.PRIMARY_COLOR.color,
        dotColor: APP_COLORS.YELLOW_COLOR.color,
      };
      const dates = getDatesBetween(start_date, end_date);
      for (let i = 0; i < dates.length; i++) {
        intervals[
          `${formatDateToYYYYMMDD(dates[i]).replace(new RegExp("/", "g"), "-")}`
        ] = {
          selected: true,
          marked: true,
          selectedColor: APP_COLORS.PRIMARY_COLOR_TRANSPARENT.color,
        };
      }
      return intervals;
    } else {
      const interval = {};
      interval[`${startDate || endDate}`] = {
        selected: true,
        marked: true,
        selectedColor: APP_COLORS.PRIMARY_COLOR.color,
        dotColor: APP_COLORS.YELLOW_COLOR.color,
      };
      return interval;
    }
  } catch (error) {
    console.log({ error });
  }
};

export const getDatesBetween = (from = new Date(), to = new Date()) => {
  const dates = [];
  let currentDate = from;
  const addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  currentDate = addDays.call(currentDate, 1);
  while (currentDate < to) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};

export const convertDateStringFormat = (value = "") => {
  try {
    if (isFieldWithValue(value)) {
      const parts = value.split("-");
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return "";
  } catch (error) {
    console.log({ error });
    return "";
  }
};

const defineDayOf = (dayValue, date) => {
  const mois = [
    "Janv.",
    "Fév.",
    "Mars.",
    "Avr.",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct",
    "Nov",
    "Dec",
  ];
  const minutes =
    date?.getMinutes() > 9 ? date?.getMinutes() : "0" + date?.getMinutes();
  const hours =
    date?.getHours() > 9 ? date?.getHours() : "0" + date?.getHours();
  switch (dayValue) {
    case 1:
      return "Hier à " + hours + ":" + minutes;
    default:
      return (
        date?.getDate() +
        " " +
        mois[date?.getMonth()] +
        " " +
        date?.getFullYear()
        // +
        // " à " +
        // hours +
        // ":" +
        // minutes
      );
  }
};

export const timing = (date, notAdd = false) => {
  try {
    var today = new Date();
    var dtime = new Date(date.toString());
    var diffMs = today - dtime; // milliseconds between now & Christmas
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    if (diffDays > 0) {
      return defineDayOf(diffDays, dtime);
    } else {
      if (diffHrs > 0) {
        return notAdd ? diffHrs + "h" : "il y'a " + diffHrs + "h";
      } else {
        if (diffMins < 1) {
          return "à l'instant";
        } else {
          return notAdd ? diffMins + " min." : "il y'a " + diffMins + " min.";
        }
      }
    }
  } catch (error) {
    console.log({ error });
    return "";
  }
};

export const EReservationDuration = {
  LONG_TIME: "Long séjour",
  DAY: "Journée",
  HALF_DAY: "Démi-journée",
  NIGHT: "Nuitée",
};

export const formatReservationIntervalDate = (startDate, endDate) => {
  try {
    if (startDate && endDate) {
      return `${formatDateToDDMMYYYY(new Date(startDate))} - ${formatDateToDDMMYYYY(new Date(endDate))}`
    }
    if (startDate && !endDate) {
      return `${formatDateToDDMMYYYY(new Date(startDate))}`
    }
    return "";
  } catch (error) {
    console.log({ error });
    return "";
  }
}

export const calculateTimeDifference = (endDate) => {
  const now = new Date();
  const end = new Date(endDate);
  const timeDiff = end - now;

  const isPast = timeDiff < 0;
  const absTimeDiff = Math.abs(timeDiff);

  const days = Math.floor(absTimeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (absTimeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((absTimeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((absTimeDiff % (1000 * 60)) / 1000);

  return {
    isPast,
    days,
    hours,
    minutes,
    seconds,
  };
};
const isNumber = (str) => !isNaN(Number(str));

export const isValidHour = (hour = "") => {
  try {
    if (onlyContainsNumber(hour)) {
      const value = +hour;
      if (value >=0 && value <= 23) return true
    }
    return false;
  } catch (error) {
    return false;
  }
}

export const isValidMinute = (minute = "") => {
  try {
    if (onlyContainsNumber(minute)) {
      const value = +minute;
      if (value >=0 && value <= 59) return true
    }
    return false;
  } catch (error) {
    return false;
  }
}