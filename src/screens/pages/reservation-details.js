import { View, Text, ScrollView, Linking, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SAFE_AREA_VIEW } from "../../styling/screens";
import FullLoadingContainer from "../../components/loaders/full-loading";
import { EReservationStatus, ShowToastMessage, formatPrice, truncateText } from "../../utils/system";
import UserContext from "../../config/contexts/user";
import { GetReservationsList } from "../../config/endpoints/api";
import { APP_COLORS } from "../../styling/color";
import { REQUEST_CARD_STYLING, ROOM_DETAILS_STYLING } from "../../styling/cards";
import BackButton from "../../components/buttons/back-button";
import { SYSTEM_STYLING } from "../../styling/system";
import RoomCard from "../../components/cards/room-card";
import { formatReservationIntervalDate } from "../../utils/dates";
import { AntDesign } from "@expo/vector-icons";

export default function RoomCurrentReservationDetails({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [reservationData, setReservationData] = useState(null);
  const [room, setRoom] = useState(null);
  const { account } = useContext(UserContext);

  useEffect(() => {
    if (!route.params?.room) {
      navigation.goBack();
    } else {
      setRoom(route.params.room);
      getRoomReservationDetails();
    }
  }, []);

  useEffect(() => {
    if (reservationData) {
      setIsLoading(false);
    }
  }, [reservationData]);

  const getRoomReservationDetails = async () => {
    try {
      const value = route.params?.room;
      const payload = {
        by: account.code,
        page: 1,
        limit: 1,
        places: [value.code],
        status: [EReservationStatus.IN_PROGRESS],
      };
      const response = await GetReservationsList(payload, account.access_token);
      const { success, data } = response.data;
      if (success) {
        if (data.reservations?.length) {
          setReservationData(data.reservations[0]);
        } else {
          ShowToastMessage("Aucune réservation en cours pour cette pièce.");
        }
      } else {
        ShowToastMessage(
          "Une erreur est survenue. Réessayer SVP",
          APP_COLORS.RED_COLOR.color,
          APP_COLORS.WHITE_COLOR.color
        );
        navigation.goBack();
      }
    } catch (error) {
      console.log({ error });
      ShowToastMessage(
        "Une erreur est survenue. Réessayer SVP",
        APP_COLORS.RED_COLOR.color,
        APP_COLORS.WHITE_COLOR.color
      );
      navigation.goBack();
    }
  };

  const callUser = async () => {
    try {
      await Linking.openURL(`tel:${reservationData?.user?.phone}`);
    } catch (error) {
      console.log({ error });
    }
  };

  const renderUserReservation = () => (
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
                  `${reservationData?.user?.firstName} ${reservationData?.user?.lastName}`,
                  50
                )}
              </Text>
            </View>
            
          </View>
          {/* <Text>{`${reservationData?.user?.phone}`}</Text> */}
          <Text style={REQUEST_CARD_STYLING.reservationInterval}>
            {formatReservationIntervalDate(reservationData?.startDate, reservationData?.endDate)}
          </Text>
        </View>
      </View>
  )
  return (
    <SafeAreaView
      style={SAFE_AREA_VIEW.container}
      edges={["right", "left", "top"]}
    >
      {isLoading ? (
        <FullLoadingContainer />
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={ROOM_DETAILS_STYLING.header}>
            <View style={{ flexDirection: "row-reverse" }}>
              <BackButton
                onClick={() => navigation.goBack()}
                iconColor={APP_COLORS.WHITE_COLOR.color}
                backgroundColor={APP_COLORS.PRIMARY_COLOR.color}
              />
            </View>
            <View style={ROOM_DETAILS_STYLING.title_header}>
              <Text style={SYSTEM_STYLING.title}>Réservation</Text>
            </View>
          </View>
          {renderUserReservation()}
          <RoomCard data={room} onClick={() => null} price={reservationData?.price?.value} reservation={reservationData}/>
          <View
            style={[
              ROOM_DETAILS_STYLING.section,
              {
                backgroundColor: APP_COLORS.WHITE_COLOR.color,
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ color: APP_COLORS.BLACK_COLOR.color }}>
                Nom
              </Text>
            </View>
            <View style={{ flexDirection: "row-reverse" }}>
              <Text
                style={[
                  ROOM_DETAILS_STYLING.reservation_user,
                  {
                    color: APP_COLORS.BLACK_COLOR.color,
                    
                  },
                ]}
              >
                {truncateText(`${reservationData?.user?.firstName} ${reservationData?.user?.lastName}`, 250)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[
              ROOM_DETAILS_STYLING.section,
              {
                backgroundColor: APP_COLORS.YELLOW_COLOR.color,
              },
            ]}
            onPress={() => callUser()}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ color: APP_COLORS.BLACK_COLOR.color }}>
                Téléphone
              </Text>
            </View>
            <View style={{ flexDirection: "row-reverse" }}>
              <Text
                style={[
                  ROOM_DETAILS_STYLING.reservation_user,
                  {
                    color: APP_COLORS.BLACK_COLOR.color,
                    
                  },
                ]}
              >
                {`${reservationData?.user?.phone}`}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={[
              ROOM_DETAILS_STYLING.section,
              {
                backgroundColor: APP_COLORS.PRIMARY_COLOR.color,
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ color: APP_COLORS.WHITE_COLOR.color }}>
                Prix
              </Text>
            </View>
            <View style={{ flexDirection: "row-reverse" }}>
              <Text
                style={[
                  ROOM_DETAILS_STYLING.reservation_user,
                  {
                    color: APP_COLORS.WHITE_COLOR.color,
                    
                  },
                ]}
              >
                {formatPrice(`${reservationData?.price?.value || ""}`)}
              </Text>
            </View>
          </View>
          <View
            style={[
              ROOM_DETAILS_STYLING.section,
              {
                backgroundColor: "#EEE8A9",
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ color: APP_COLORS.BLACK_COLOR.color }}>
                Durée
              </Text>
            </View>
            <View style={{ flexDirection: "row-reverse" }}>
              <Text
                style={[
                  ROOM_DETAILS_STYLING.reservation_user,
                  {
                    color: APP_COLORS.BLACK_COLOR.color,
                    
                  },
                ]}
              >
                {/* {formatPrice(`${reservationData?.price?.value || ""}`)} */}
                {formatReservationIntervalDate(reservationData?.startDate, reservationData?.endDate)}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
