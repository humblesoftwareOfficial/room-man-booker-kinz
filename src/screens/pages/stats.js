import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SAFE_AREA_VIEW } from "../../styling/screens";
import { SafeAreaView } from "react-native-safe-area-context";
import StatsHeader from "../../components/headers/stats-header";
// import CircularProgress from "react-native-circular-progress-indicator";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { APP_COLORS } from "../../styling/color";
import { STATS_STYLING } from "../../styling/stats";
import UserContext from "../../config/contexts/user";
import {
  ShowToastMessage,
  formatPrice,
  EAccountType,
  SCREENS_NAME,
} from "../../utils/system";
import { GetCompanyStats } from "../../config/endpoints/api";
import FullLoadingContainer from "../../components/loaders/full-loading";
import CustomButton from "../../components/buttons/custom-button";
import ProgressBar from "../../components/progressbar";
import { SimpleLineIcons } from "@expo/vector-icons";
import QuickRecapCard from "../../components/cards/quick-recap-card";

export default function Stats({ navigation }) {
  const { account } = useContext(UserContext);
  const [statsData, setStatsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStats();
  }, []);

  useEffect(() => {
    if (statsData) {
      setIsLoading(false);
      // console.log(statsData.acceptedReservations?.count);
    }
  }, [statsData]);

  const getStats = async () => {
    try {
      setIsLoading(true);
      const payload = {
        company: account.company.code,
        by: account.code,
      };
      const response = await GetCompanyStats(payload, account.access_token);
      const { data, success, message } = response.data;
      if (success) {
        setStatsData(data);
      } else {
        ShowToastMessage(
          message || "Une erreur est survenue. Veuillez réessayer",
          APP_COLORS.RED_COLOR.color,
          APP_COLORS.WHITE_COLOR.color
        );
      }
    } catch (error) {
      console.log({ error });
      ShowToastMessage(
        "Une erreur est survenue. Veuillez réessayer 000000",
        APP_COLORS.RED_COLOR.color,
        APP_COLORS.WHITE_COLOR.color
      );
      setIsLoading(false);
    }
  };

  const getProgressValue = useMemo(() => {
    try {
      const value = statsData?.statusCount?.TAKEN / statsData?.totalPlaces;
      return value || 0;
    } catch (error) {
      console.log({ error });
      return 0;
    }
  }, [statsData]);

  const goToAnalytics = () => {
    try {
      navigation.navigate(SCREENS_NAME.Analytics);
    } catch (error) {
      console.log({ error })
    }
  }

  const renderRoomsStats = () => (
    <>
      <View style={{ margin: 5, marginTop: 25 }}>
        <Text style={STATS_STYLING.title_section}>PIÉCES</Text>
      </View>
      <View style={STATS_STYLING.progress_bar}>
        {/* <CircularProgress
          value={getProgressValue}
          radius={Math.ceil(Dimensions.get("screen").width / 4)}
          progressValueColor={APP_COLORS.PRIMARY_COLOR.color}
          activeStrokeColor={APP_COLORS.PRIMARY_COLOR.color}
          inActiveStrokeColor="#63797D"
          inActiveStrokeOpacity={0.5}
          inActiveStrokeWidth={20}
          activeStrokeWidth={35}
          valueSuffix="%"
          duration={1000} //fix
        /> */}
        <ProgressBar
          label="Occupation des pièces"
          progress={getProgressValue}
          color={APP_COLORS.PRIMARY_COLOR.color}
        />
      </View>
      <View
        style={[
          STATS_STYLING.recap_cards_section,
          {
            backgroundColor: APP_COLORS.YELLOW_COLOR.color,
          },
        ]}
      >
        <Text style={STATS_STYLING.stat_value}>
          {statsData?.statusCount?.TAKEN || "0"}
        </Text>
        <Text style={[STATS_STYLING.stat_desc, { color: "#000" }]}>
          Pièces occupées
        </Text>
      </View>
      <View
        style={[
          STATS_STYLING.recap_cards_section,
          {
            backgroundColor: APP_COLORS.PRIMARY_COLOR.color,
          },
        ]}
      >
        <Text style={[STATS_STYLING.stat_value, { color: "#FFF" }]}>
          {statsData?.statusCount?.AVAILABLE || "0"}
        </Text>
        <Text style={[STATS_STYLING.stat_desc, { color: "#FFF" }]}>
          Pièces disponibles
        </Text>
      </View>
    </>
  );

  const renderCAStats = () => (
    <View style={{ backgroundColor: "#FFF", marginTop: 20, marginBottom: 25 }}>
      <View style={{ margin: 5, marginTop: 25 }}>
        <Text style={STATS_STYLING.title_section}>CHIFFRE D'AFFAIRE</Text>
      </View>
      <View style={STATS_STYLING.values}>
        <View style={STATS_STYLING.left_values}>
          <View style={STATS_STYLING.icon_values}>
            <SimpleLineIcons name="graph" size={24} color="#602A45" />
          </View>
          <Text style={STATS_STYLING.label_values}>C.A du jour</Text>
        </View>
        <View
          style={[
            STATS_STYLING.right_values,
            {
              backgroundColor: "#602A45",
            },
          ]}
        >
          <Text
            style={[
              STATS_STYLING.stat_value,
              {
                color: "#FFF",
              },
            ]}
          >
            {formatPrice(`${statsData?.placesCADaily || 0}` || "0")} XOF
          </Text>
        </View>
      </View>
      {account?.accountType === EAccountType.ADMIN && (
        <View style={STATS_STYLING.values}>
          <View style={STATS_STYLING.left_values}>
            <View style={STATS_STYLING.icon_values}>
              <SimpleLineIcons name="graph" size={24} color="#E17225" />
            </View>
            <Text style={STATS_STYLING.label_values}>C.A de la semaine</Text>
          </View>
          <View
            style={[
              STATS_STYLING.right_values,
              {
                backgroundColor: "#E17225",
              },
            ]}
          >
            <Text
              style={[
                STATS_STYLING.stat_value,
                {
                  color: "#FFF",
                },
              ]}
            >
              {formatPrice(`${statsData?.placesCAWeek || 0}` || "0")} XOF
            </Text>
          </View>
        </View>
      )}
      {account?.accountType === EAccountType.ADMIN && (
        <View style={STATS_STYLING.values}>
          <View style={STATS_STYLING.left_values}>
            <View style={STATS_STYLING.icon_values}>
              <SimpleLineIcons name="graph" size={24} color="#00444B" />
            </View>
            <Text style={STATS_STYLING.label_values}>C.A du mois</Text>
          </View>
          <View
            style={[
              STATS_STYLING.right_values,
              {
                backgroundColor: "#00444B",
              },
            ]}
          >
            <Text
              style={[
                STATS_STYLING.stat_value,
                {
                  color: "#FFF",
                },
              ]}
            >
              {formatPrice(`${statsData?.placesCAMonth || 0}` || "0")} XOF
            </Text>
          </View>
        </View>
      )}
      {account?.accountType === EAccountType.ADMIN && (
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity style={STATS_STYLING.see_more} onPress={goToAnalytics}>
            <Text style={STATS_STYLING.see_more_text}>Voir Plus ...</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderReservationsStats = () => (
    <>
      <View style={{ margin: 5, marginBottom: 25 }}>
        <Text style={STATS_STYLING.title_section}>RESERVATIONS</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 10 }}
      >
        <QuickRecapCard
          backgroundColor="rgba(236, 238, 241, 1)"
          label="Enregistrées (Total)"
          count={statsData?.totalReservations?.count}
        />
        <QuickRecapCard
          backgroundColor="rgba(0, 138, 91, 0.3)"
          label="Acceptées"
          count={statsData?.acceptedReservations?.count}
        />
        <QuickRecapCard
          backgroundColor="rgba(255, 201, 60, 0.3)"
          label="Actuellement en cours"
          count={statsData?.currentReservations?.count}
        />
        {/* <QuickRecapCard
                    backgroundColor="rgba(10, 159, 230, 0.3)"
                    label="Terminées"
                    count={17}
                  /> */}
        <QuickRecapCard
          backgroundColor="rgba(161, 65, 115, 0.3)"
          label="Annulées"
          count={statsData?.cancelledReservations?.count}
        />
      </ScrollView>
    </>
  );

  return (
    <SafeAreaView
      style={[SAFE_AREA_VIEW.container, { backgroundColor: "#FFF"}]}
      edges={["right", "left", "top"]}
    >
      <StatsHeader onReload={getStats} />
      <ScrollView
        style={{ flex: 1 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <FullLoadingContainer text="Récupération des données de stats." />
        ) : (
          <>
            {statsData !== null && statsData !== undefined ? (
              <>
                {account?.accountType === EAccountType.ADMIN &&
                  renderReservationsStats()}
                {/* {} */}
                {renderRoomsStats()}
                {renderCAStats()}
              </>
            ) : (
              <CustomButton
                label="Actualiser"
                bgColor={APP_COLORS.YELLOW_COLOR.color}
                textColor={APP_COLORS.PRIMARY_COLOR.color}
                onClick={getStats}
              />
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
