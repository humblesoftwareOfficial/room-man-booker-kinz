import { View, Text, useColorScheme, Dimensions, TouchableOpacity } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SAFE_AREA_VIEW } from "../../styling/screens";
import RoomHeader from "../../components/headers/room-header";
import CustomTabBar from "../../components/tabbar";
import { SCREENS_NAME, generateKey } from "../../utils/system";
import FullLoadingContainer from "../../components/loaders/full-loading";
import UserContext from "../../config/contexts/user";
import { GetHousesList } from "../../config/endpoints/api";
import CustomButton from "../../components/buttons/custom-button";
import { APP_COLORS } from "../../styling/color";
import BottomModal from "../../components/modals/bottom-modal";
import { SYSTEM_STYLING } from "../../styling/system";
import { NEW_ROOM_STYLE } from "../../styling/rooms";
import { ROOM_STATUS, ROOM_STATUS_TRADUCTION } from "../../utils/rooms";

const MODAL_HEIGHT = Math.ceil(Dimensions.get("window").height / 3.5);
const MODAL_HEIGHT_FILTERS = Math.ceil(Dimensions.get("window").height / 1.5);

export default function Rooms({ navigation }) {
  const scheme = useColorScheme();
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [openOptions, setOpenOptions] = useState(false);
  const [houses, setHouses] = useState(null);
  const [openModalFilter, setOpenModalFilter] = useState(false);
  const { account } = useContext(UserContext);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState([]);

  useEffect(() => {
    getHouses();
  }, []);

  useEffect(() => {
    if (houses) {
      setIsLoading(false);
    }
  }, [houses]);

  const getHouses = async () => {
    try {
      setIsLoading(true);
      const payload = {
        companies: [account.company.code],
        page: 1,
        limit: 25,
      };
      const response = await GetHousesList(payload, account.access_token);
      const { success, data } = response.data;
      if (success) {
        setHouses(data.houses);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const onChangeTab = ({ position }) => {
    setActiveTab(position);
  };

  const renderOptions = () => (
    <View style={[{ flex: 1, flexDirection: "column-reverse", }, SYSTEM_STYLING.platformMarginBottom]}>
      <CustomButton
        label="Nouvelle Maison"
        bgColor={APP_COLORS.PRIMARY_COLOR.color}
        textColor={APP_COLORS.WHITE_COLOR.color}
        onClick={goToNewHouse}
      />
      <CustomButton
        label="Nouvelle Pièce"
        bgColor="#3A4856"
        onClick={goToNewRoom}
        borderWidth={1}
        borderColor={APP_COLORS.YELLOW_COLOR.color}
      />
    </View>
  );

  const goToNewHouse = () => {
    try {
      setOpenOptions(false);
      navigation.navigate(SCREENS_NAME.NewHouse, {});
    } catch (error) {
      console.log({ error });
    }
  };

  const goToNewRoom = () => {
    try {
      setOpenOptions(false);
      navigation.navigate(SCREENS_NAME.NewRoom, {
        house: houses[activeTab]
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const goToRequests = () => {
    try {
      navigation.navigate(SCREENS_NAME.ReservationsRequests);
    } catch (error) {
      console.log({ error })
    }
  }

  const renderStatusFilter = useCallback(
    () => (
      <View style={{ flex: 1, marginTop: 15 }}>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>Filtrer par chambre </Text>
        <View style={{ flex: 1, marginTop: 15 }}>
          {Object.keys(ROOM_STATUS).map((value, index) => (
            <TouchableOpacity
              key={generateKey()}
              style={[
                NEW_ROOM_STYLE.property_item,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: selectedStatus?.includes(
                    ROOM_STATUS[value]
                  )
                    ? APP_COLORS.PRIMARY_COLOR.color
                    : APP_COLORS.LIGHT_COLOR.color,
                },
              ]}
              onPress={() => onSelectStatus(ROOM_STATUS[value])}
            >
              <Text
                style={[
                  NEW_ROOM_STYLE.property_label,
                  {
                    color: selectedStatus?.includes(ROOM_STATUS[value])
                      ? APP_COLORS.WHITE_COLOR.color
                      : APP_COLORS.BLACK_COLOR.color,
                  },
                ]}
              >
                {ROOM_STATUS_TRADUCTION[value]}
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
      <RoomHeader
        onAdd={() => setOpenOptions(true)}
        onReload={() => getHouses()}
        goToRequests={() => goToRequests()}
        onShowFilter={() => setOpenModalFilter(true)}
      />
      {isLoading ? (
        <FullLoadingContainer />
      ) : (
        <>
          {houses.length ? (
            <CustomTabBar
              navigation={navigation}
              account={null}
              tabs={houses || []}
              filterCategories={[]}
              onChangeTab={onChangeTab}
              defaultActiveTab={activeTab}
              filterStatus={selectedStatusFilter || []}
            />
          ) : (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center" }}>
                Aucune maison enregistrée pour cette compagnie.
              </Text>
              <CustomButton
                label="Ajouter une maison + "
                bgColor={APP_COLORS.PRIMARY_COLOR.color}
                textColor={APP_COLORS.WHITE_COLOR.color}
                onClick={goToNewHouse}
              />
              <CustomButton
                label="Réactualiser"
                // bgColor={APP_COLORS.PRIMARY_COLOR.color}
                textColor={APP_COLORS.PRIMARY_COLOR.color}
                onClick={getHouses}
              />
            </View>
          )}
        </>
      )}
      <BottomModal
        showModal={openOptions}
        onClose={() => {
          setOpenOptions(false);
        }}
        content={renderOptions()}
        minHeight={MODAL_HEIGHT}
        backgroundColor="transparent"
        sliderBackgroundColor="rgba(0, 0, 0, 0.7)"
        overlay="rgba(0, 0, 0, 0.7)"
        borderRadius={0}
      />
      <BottomModal
        showModal={openModalFilter}
        onClose={() => {
          setOpenModalFilter(false);
        }}
        content={renderStatusFilter()}
        minHeight={MODAL_HEIGHT_FILTERS}
        backgroundColor={APP_COLORS.WHITE_COLOR.color} //{APP_COLORS.LIGHT_COLOR.color}
        sliderBackgroundColor={APP_COLORS.BLACK_COLOR.color} //{APP_COLORS.PRIMARY_COLOR.color}
        overlay="rgba(0, 0, 0, 0.7)"
      />
    </SafeAreaView>
  );
}
