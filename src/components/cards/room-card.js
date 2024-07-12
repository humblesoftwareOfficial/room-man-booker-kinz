import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { ROOM_CARD_STYLING, ROOM_DETAILS_STYLING } from "../../styling/cards";
import { EReservationStatus, formatPrice, generateKey, truncateText } from "../../utils/system";
import { FontAwesome6 } from "@expo/vector-icons";
import { APP_COLORS } from "../../styling/color";
import {
  ROOM_PROPERTIES_TRADUCTION,
  ROOM_STATUS,
  getRoomPropertyIcon,
} from "../../utils/rooms";
import { calculateTimeDifference } from "../../utils/dates";
import CountdownTimer from "../time/count-down-timer";

const RoomCard = ({ data = {}, onClick, showProperty = false, price = null, reservation = null }) => {

  const [currentReservation, setCurrentReservation] = useState(reservation || data?.reservation);

  const getStatusColor = () => {
    try {
      switch (data.currentStatus) {
        case ROOM_STATUS.AVAILABLE:
          return APP_COLORS.GREEN_COLOR.color;
        case ROOM_STATUS.TAKEN:
          return APP_COLORS.RED_COLOR.color;
        case ROOM_STATUS.OFF:
          return APP_COLORS.TERTIARY_COLOR.color;
        default:
          return APP_COLORS.TERTIARY_COLOR.color;
      }
    } catch (error) {
      return APP_COLORS.PRIMARY_COLOR.color;
    }
  };

  const getStatusText = () => {
    try {
      switch (data.currentStatus) {
        case ROOM_STATUS.AVAILABLE:
          return "Disponible";
        case ROOM_STATUS.TAKEN:
          return "Occupée";
        case ROOM_STATUS.OFF:
          return "Off";
        default:
          return "";
      }
    } catch (error) {
      return "";
    }
  };

  const renderProperties = useCallback(
    () =>
      data?.properties?.map((property, index) => (
        <View
          style={ROOM_DETAILS_STYLING.property}
          key={index}
          nativeID={generateKey()}
        >
          <View style={ROOM_DETAILS_STYLING.property_icon}>
            <Text>{getRoomPropertyIcon(property)}</Text>
          </View>
          <View style={ROOM_DETAILS_STYLING.property_label}>
            <Text style={{ fontSize: 9 }}>
              {ROOM_PROPERTIES_TRADUCTION[property]}
            </Text>
          </View>
        </View>
      )),
    [data]
  );

  return (
    <TouchableOpacity
      style={ROOM_CARD_STYLING.container}
      activeOpacity={0.8}
      onPress={() => onClick(data)}
    >
      <View style={ROOM_CARD_STYLING.image}>
        {Boolean(data.medias?.length) && (
          <ImageBackground
            ImageBackground
            source={{ uri: data?.medias[0].url }}
            style={[ROOM_CARD_STYLING.image_container]}
            imageStyle={{ resizeMode: "cover", borderRadius: 25 }}
          />
        )}
      </View>
      <View style={ROOM_CARD_STYLING.infos}>
        <Text style={ROOM_CARD_STYLING.title}>
          {data.position?.description || data.house?.address}
        </Text>
        <Text style={ROOM_CARD_STYLING.description}>
          {truncateText(data.description, 150)}
        </Text>
        <View style={ROOM_CARD_STYLING.status}>
          <FontAwesome6 name="dot-circle" size={24} color={getStatusColor()} />
          <Text
            style={[
              ROOM_CARD_STYLING.status_text,
              {
                color: getStatusColor(),
              },
            ]}
          >
            {getStatusText()}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 5,
              borderRadius: 50,
              backgroundColor: APP_COLORS.PRIMARY_COLOR.color,
            }}
          >
            <Text
              style={[
                ROOM_CARD_STYLING.price,
                {
                  color: APP_COLORS.WHITE_COLOR.color,
                  textAlign: "center",
                },
              ]}
            >
              {formatPrice(`${price || data.prices[0].value}`)} XOF
            </Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
      </View>
      {showProperty && (
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 15 }}>
          {renderProperties()}
        </View>
      )}
      {currentReservation && currentReservation?.status === EReservationStatus.IN_PROGRESS && (
        <View
        style={{
          backgroundColor: calculateTimeDifference(currentReservation?.endDate).isPast
            ? 'rgba(153, 50, 68, 0.5)'
            : 'rgba(255, 201, 60, 0.5)',
          borderRadius: 5,
          marginTop: 10,
          marginBottom: 10
        }}
      >
          <CountdownTimer endDate={currentReservation?.endDate} />
      </View>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(RoomCard);
