import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SAFE_AREA_VIEW } from "../../../styling/screens";
import BackButton from "../../../components/buttons/back-button";
import { APP_COLORS } from "../../../styling/color";
import { ANALYTICS_STYLING } from "../../../styling/analytics";
import { HEADER_STYLE } from "../../../styling/headers";
import { AntDesign, Feather } from "@expo/vector-icons";
import DefaultModal from "../../../components/modals/default-modal";
import CustomDatePickerRangeFilter from "../../../components/dates/date-picker-range-filter";
import FullLoadingContainer from "../../../components/loaders/full-loading";
import QuickRecapCard from "../../../components/cards/quick-recap-card";
import { STATS_STYLING } from "../../../styling/stats";
import UserContext from "../../../config/contexts/user";
import { convertDateStringFormat } from "../../../utils/dates";
import { GetCompanyStatsRecap } from "../../../config/endpoints/api";
import { formatPrice, isFieldWithValue } from "../../../utils/system";

export default function Analytics({ navigation, route }) {
  const [openModalFilter, setOpenModalFilter] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recap, setRecap] = useState(null);
  const { account } = useContext(UserContext);

  useEffect(() => {
    if (recap) {
      setIsLoading(false);
    }
  }, [recap]);

  useEffect(() => {
    getStats();
  }, []);

  const onValidDate = (start, end, duration) => {
    try {
      setOpenModalFilter(false);
      setStartDate(start);
      setEndDate(end);
      getStats(start, end);
    } catch (error) {
      console.log({ error });
    }
  };

  const getStats = async (start, end) => {
    try {
      setIsLoading(true);
      const today = new Date();
      const formatDate = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
      const formattedStartDate = start
        ? `${convertDateStringFormat(start)}`
        : `${convertDateStringFormat(formatDate)}`;
      const payload = {
        by: account.code,
        company: account.company.code,
        startDate: formattedStartDate,
        endDate: end ? `${convertDateStringFormat(end)}` : formattedStartDate,
      };
      const response = await GetCompanyStatsRecap(
        payload,
        account.access_token
      );
      const { success, data } = response.data;
      if (success) {
        setRecap(data);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const renderReservationsRecap = () => (
    <View style={ANALYTICS_STYLING.reservation_container}>
      <View style={ANALYTICS_STYLING.reservation_recap_item}>
        <View
          style={[
            ANALYTICS_STYLING.reservation_recap_item_circle,
            {
              backgroundColor: "rgba(0, 172, 208, 0.4)",
            },
          ]}
        >
          <Feather name="users" size={24} color="rgb(0, 172, 208)" />
        </View>
        <Text style={ANALYTICS_STYLING.small_text}>Demandes</Text>
        <Text>{recap?.totalReservations?.count || "0"}</Text>
      </View>
      <View style={ANALYTICS_STYLING.reservation_recap_item}>
        <View
          style={[
            ANALYTICS_STYLING.reservation_recap_item_circle,
            {
              backgroundColor: "rgba(50, 132, 113, 0.5)",
            },
          ]}
        >
          <Feather name="user-check" size={24} color="rgb(51, 137, 128)" />
        </View>
        <Text style={ANALYTICS_STYLING.small_text}>Terminées</Text>
        <Text>{recap?.doneReservations?.count || "0"}</Text>
      </View>
      <View style={ANALYTICS_STYLING.reservation_recap_item}>
        <View
          style={[
            ANALYTICS_STYLING.reservation_recap_item_circle,
            {
              backgroundColor: "rgba(255, 201, 60, 0.3)",
            },
          ]}
        >
          <Feather name="user" size={24} color="rgb(255, 201, 60)" />
        </View>
        <Text style={ANALYTICS_STYLING.small_text}>En cours</Text>
        <Text>{recap?.currentReservations?.count || "0"}</Text>
      </View>
      <View style={ANALYTICS_STYLING.reservation_recap_item}>
        <View
          style={[
            ANALYTICS_STYLING.reservation_recap_item_circle,
            {
              backgroundColor: "rgba(153, 50, 68, 0.4)",
            },
          ]}
        >
          <Feather name="user-x" size={24} color="rgb(153, 50, 68)" />
        </View>
        <Text style={ANALYTICS_STYLING.small_text}>Annulées</Text>
        <Text>{recap?.cancelledReservations?.count || "0"}</Text>
      </View>
    </View>
  );

  const getFilterDateValue = useCallback(() => {
    try {
      const today = new Date();
      const formatDate = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
      let value = ""
      if (isFieldWithValue(startDate)) value += convertDateStringFormat(startDate);
      if (isFieldWithValue(endDate)) value += ` au ${convertDateStringFormat(endDate)}`;
      if (!isFieldWithValue(startDate)) value = convertDateStringFormat(formatDate);
      return value;
    } catch (error) {
      console.log({ error });
      return "";
    }
  }, [startDate, endDate]);

  return (
    <SafeAreaView
      style={[SAFE_AREA_VIEW.container, { backgroundColor: "#FFF" }]}
      edges={["right", "left", "top"]}
    >
      <View style={ANALYTICS_STYLING.header}>
        <View style={{ flexDirection: "row-reverse" }}>
          <BackButton
            onClick={() => navigation.goBack()}
            iconColor={APP_COLORS.WHITE_COLOR.color}
            backgroundColor={APP_COLORS.PRIMARY_COLOR.color}
          />
        </View>
        <View style={ANALYTICS_STYLING.title_header}>
          {!isLoading && (
            <TouchableOpacity
              style={[
                HEADER_STYLE.main_right,
                { backgroundColor: APP_COLORS.YELLOW_COLOR.color, margin: 0 },
              ]}
              onPress={() => setOpenModalFilter(true)}
            >
              <AntDesign
                name="calendar"
                size={24}
                color={APP_COLORS.BLACK_COLOR.color}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {isLoading ? (
        <FullLoadingContainer />
      ) : (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ marginBottom: 15 }}>
            <Text style={ANALYTICS_STYLING.title}>
              {" "}
              Chiffre d'affaire du <Text style={{ fontWeight: "bold", fontSize: 15}}>{getFilterDateValue()}</Text>
            </Text>
          </View>
          <View style={ANALYTICS_STYLING.container}>
            <View style={ANALYTICS_STYLING.ca_value_card}>
              <Text style={ANALYTICS_STYLING.ca_value_label}>TOTAL</Text>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={ANALYTICS_STYLING.ca_value}>
                  {formatPrice(`${recap?.ca || "0"}`)}
                </Text>
                <Text style={[ANALYTICS_STYLING.ca_value, { fontSize: 14 }]}>
                  {" "}
                  F CFA
                </Text>
              </View>
            </View>
          </View>
          {renderReservationsRecap()}
        </ScrollView>
      )}
      <DefaultModal
        show={openModalFilter}
        onClose={() => setOpenModalFilter(false)}
        backgroundColor={APP_COLORS.PRIMARY_COLOR.color}
        paddingHorizontal={0}
        content={
          <SafeAreaView
            style={[SAFE_AREA_VIEW.container, {}]}
            edges={["right", "left", "top"]}
          >
            <CustomDatePickerRangeFilter
              onClose={() => console.log("close")}
              onBook={onValidDate}
              customTitle="Choisir une date"
              hideDuration
              withPastDateExclusion
            />
          </SafeAreaView>
        }
      />
    </SafeAreaView>
  );
}
