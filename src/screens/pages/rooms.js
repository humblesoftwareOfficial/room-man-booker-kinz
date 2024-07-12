import { View, Text, useColorScheme, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SAFE_AREA_VIEW } from "../../styling/screens";
import RoomsList from "../../components/lists/rooms-list";
import RoomHeader from "../../components/headers/room-header";
import CustomTabBar from "../../components/tabbar";
import { SCREENS_NAME, generateKey } from "../../utils/system";
import FullLoadingContainer from "../../components/loaders/full-loading";
import UserContext from "../../config/contexts/user";
import { GetHousesList } from "../../config/endpoints/api";
import CustomButton from "../../components/buttons/custom-button";
import { APP_COLORS } from "../../styling/color";
import BottomModal from "../../components/modals/bottom-modal";
import { useFocus } from "../../config/hooks/useFocus";
import { SYSTEM_STYLING } from "../../styling/system";

const MODAL_HEIGHT = Math.ceil(Dimensions.get("window").height / 3.5);

export default function Rooms({ navigation }) {
  const scheme = useColorScheme();
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [openOptions, setOpenOptions] = useState(false);
  const [houses, setHouses] = useState(null);
  const { account } = useContext(UserContext);

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
        limit: 10,
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

  return (
    <SafeAreaView
      style={[SAFE_AREA_VIEW.container, {}]}
      edges={["right", "left", "top"]}
    >
      <RoomHeader
        onAdd={() => setOpenOptions(true)}
        onReload={() => getHouses()}
        goToRequests={() => goToRequests()}
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
    </SafeAreaView>
  );
}
