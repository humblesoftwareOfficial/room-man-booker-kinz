import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { REQUEST_CARD_STYLING } from "../../styling/cards";
import { AntDesign } from "@expo/vector-icons";
import { APP_COLORS } from "../../styling/color";
import {
  EReservationStatus,
  EReservationStatusTraduction,
  generateKey,
  isFieldWithValue,
  truncateText,
} from "../../utils/system";
import MiniRoomCard from "./mini-room-card";
import {
  calculateTimeDifference,
  formatDateToDDMMYYYY,
  formatReservationIntervalDate,
  timing,
} from "../../utils/dates";
import CountdownTimer from "../time/count-down-timer";

export default function RequestCard({ data, onClick }) {
  const getStatusColor = () => {
    try {
      switch (data?.status) {
        case EReservationStatus.ON_REQUEST:
          return "#FFB465";
        case EReservationStatus.IN_PROGRESS:
          return APP_COLORS.PRIMARY_COLOR.color;
        case EReservationStatus.ENDED:
          return APP_COLORS.GREEN_COLOR.color;
        case EReservationStatus.CANCELLED:
          return APP_COLORS.RED_COLOR.color;
        default:
          return "#63797D";
      }
    } catch (error) {
      return "#63797D";
    }
  };

  return (
    <TouchableOpacity
      style={REQUEST_CARD_STYLING.container}
      onPress={() => onClick(data)}
    >
      <View style={REQUEST_CARD_STYLING.top}>
        <View
          style={[
            REQUEST_CARD_STYLING.user_profile,
            {
              backgroundColor: "#63797D",
            },
          ]}
        >
          <AntDesign
            name="user"
            size={18}
            color={APP_COLORS.WHITE_COLOR.color}
          />
        </View>
        <View
          style={REQUEST_CARD_STYLING.user_infos}
          // onPress={() => callUser()}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <Text style={REQUEST_CARD_STYLING.user_infos_bold}>
                {truncateText(
                  `${data?.user?.firstName} ${data?.user?.lastName}`,
                  50
                )}
              </Text>
            </View>
            <Text style={REQUEST_CARD_STYLING.createdAt}>
              {isFieldWithValue(data?.createdAt) ? timing(data?.createdAt): ""}
            </Text>
            <View
              style={{
                padding: 5,
                backgroundColor: getStatusColor(),
                borderRadius: 50,
                marginLeft: 5,
              }}
            >
              <Text style={{ color: "white", fontSize: 10 }}>
                {EReservationStatusTraduction[data?.status]}
              </Text>
            </View>
          </View>
          {/* <Text>{`${data?.user?.phone}`}</Text> */}
          <Text style={REQUEST_CARD_STYLING.reservationInterval}>
            {formatReservationIntervalDate(data?.startDate, data?.endDate)}
          </Text>
        </View>
      </View>
      <MiniRoomCard
        data={data?.place}
        onClick={() => onClick(data)}
        price={data?.price?.value}
        priceTagColor={getStatusColor()}
      />
      <View style={REQUEST_CARD_STYLING.time}>
        <View style={REQUEST_CARD_STYLING.timeTag}>
          
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
      {data?.status === EReservationStatus.IN_PROGRESS && (
        <View
        style={{
          backgroundColor: calculateTimeDifference(data?.endDate).isPast
            ? 'rgba(153, 50, 68, 0.5)'
            : 'rgba(255, 201, 60, 0.5)',
          borderRadius: 5
        }}
      >
          <CountdownTimer endDate={data?.endDate} key={generateKey()}/>
          {/* <Text>test</Text> */}
      </View>
      )} 
    </TouchableOpacity>
  );
}
