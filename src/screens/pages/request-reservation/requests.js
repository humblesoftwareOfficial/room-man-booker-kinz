import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SAFE_AREA_VIEW } from "../../../styling/screens";
import ReservationsRequestsList from "../../../components/lists/reservations-requests-list";
import { REQUEST_STYLING, ROOM_DETAILS_STYLING } from "../../../styling/cards";
import { APP_COLORS } from "../../../styling/color";
import BackButton from "../../../components/buttons/back-button";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomModal from "../../../components/modals/bottom-modal";
import {
  EReservationStatus,
  EReservationStatusTraduction,
  generateKey,
} from "../../../utils/system";
import { NEW_ROOM_STYLE } from "../../../styling/rooms";
import CustomButton from "../../../components/buttons/custom-button";
import { HEADER_STYLE } from "../../../styling/headers";

const MODAL_HEIGHT = Math.ceil(Dimensions.get("window").height / 1.5);

export default function ReservationsRequests({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState([]);
  const [openModalFilter, setOpenModalFilter] = useState(false);
  const [reload, setReload] = useState(0);

  const renderStatusFilter = useCallback(
    () => (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {Object.keys(EReservationStatus).map((value, index) => (
            <TouchableOpacity
              key={generateKey()}
              style={[
                NEW_ROOM_STYLE.property_item,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: selectedStatus?.includes(
                    EReservationStatus[value]
                  )
                    ? APP_COLORS.PRIMARY_COLOR.color
                    : APP_COLORS.LIGHT_COLOR.color,
                },
              ]}
              onPress={() => onSelectStatus(EReservationStatus[value])}
            >
              <Text
                style={[
                  NEW_ROOM_STYLE.property_label,
                  {
                    color: selectedStatus?.includes(EReservationStatus[value])
                      ? APP_COLORS.WHITE_COLOR.color
                      : APP_COLORS.BLACK_COLOR.color,
                  },
                ]}
              >
                {EReservationStatusTraduction[value]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <CustomButton
          label="Filtrer"
          bgColor={APP_COLORS.BLACK_COLOR.color}
          textColor={APP_COLORS.WHITE_COLOR.color}
          borderColor={APP_COLORS.BLACK_COLOR.color}
          onClick={onApplyFilter}
        />
      </View>
    ),
    [selectedStatus]
  );

  const onApplyFilter = () => {
    try {
      setOpenModalFilter(false);
      setSelectedStatusFilter(selectedStatus);
    } catch (error) {}
  };

  const onSelectStatus = (property) => {
    try {
      const status = selectedStatus || [];
      const index = status.indexOf(property);
      if (index === -1) {
        status.push(property);
      } else {
        status.splice(index, 1);
      }
      setSelectedStatus([...status]);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <SafeAreaView
      style={[SAFE_AREA_VIEW.container, {}]}
      edges={["right", "left", "top"]}
    >
      <View style={REQUEST_STYLING.header}>
        <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
          <Text style={{}}>Réservations</Text>
          <BackButton
            onClick={() => navigation.goBack()}
            iconColor={APP_COLORS.WHITE_COLOR.color}
            backgroundColor={APP_COLORS.PRIMARY_COLOR.color}
          />
        </View>
        <View style={[REQUEST_STYLING.title_header]}>
          <TouchableOpacity
            style={[
              HEADER_STYLE.main_right,
              { backgroundColor: APP_COLORS.YELLOW_COLOR.color, margin: 0 },
            ]}
            onPress={() => setOpenModalFilter(true)}
          >
            <Ionicons
              name="filter"
              size={24}
              color={APP_COLORS.BLACK_COLOR.color}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              HEADER_STYLE.main_right,
              {
                backgroundColor: APP_COLORS.PRIMARY_COLOR.color,
                margin: 0,
                marginRight: 7,
              },
            ]}
            onPress={() => setReload(reload + 1)}
          >
            <MaterialCommunityIcons
              name="reload"
              size={24}
              color={APP_COLORS.WHITE_COLOR.color}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ReservationsRequestsList
        navigation={navigation}
        selectedStatus={selectedStatusFilter}
        reload={reload}
      />
      <BottomModal
        showModal={openModalFilter}
        onClose={() => {
          setOpenModalFilter(false);
        }}
        content={renderStatusFilter()}
        minHeight={MODAL_HEIGHT}
        backgroundColor={APP_COLORS.WHITE_COLOR.color} //{APP_COLORS.LIGHT_COLOR.color}
        sliderBackgroundColor={APP_COLORS.BLACK_COLOR.color} //{APP_COLORS.PRIMARY_COLOR.color}
        overlay="rgba(0, 0, 0, 0.7)"
      />
    </SafeAreaView>
  );
}
