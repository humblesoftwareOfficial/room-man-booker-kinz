import { View, Text } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SAFE_AREA_VIEW } from "../../../styling/screens";
import BackButton from "../../../components/buttons/back-button";
import SupervisorInfos from "./supervisor-infos";
import SelectHouse from "./select-house";
import { APP_COLORS } from "../../../styling/color";
import { isLoading } from "expo-font";
import FullLoadingContainer from "../../../components/loaders/full-loading";
import UserContext from "../../../config/contexts/user";
import { GetHousesList } from "../../../config/endpoints/api";
import { ShowToastMessage } from "../../../utils/system";
import SaveNewSupervisor from "./save-new-supervisor";

export default function NewSupervisor({ navigation }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [houses, setHouses] = useState(null);
  const { account, setNewSupervisor } = useContext(UserContext);

  useEffect(() => {
    getHouses();
    return () => {
      setNewSupervisor(null);
    };
  }, []);

  useEffect(() => {
    if (houses) {
        setIsLoading(false);
    }
  }, [houses]);

  const getHouses = async () => {
    try {
      const payload = {
        companies: [account.company.code],
        page: 1,
        limit: 50,
      };
      const response = await GetHousesList(payload, account.access_token);
      const { success, data } = response.data;
      if (success) {
        if (data.houses.length) {
           setHouses(data.houses);
        } else {
            ShowToastMessage("Ajouter d'abord une maison.", APP_COLORS.YELLOW_COLOR.color, APP_COLORS.BLACK_COLOR.color);
            onBack();
        }
      } else {
        onBack();
      }
    } catch (error) {
      console.log({ error });
      onBack();
    }
  };
  const onBack = () => {
    if (activeStep) {
      setActiveStep(activeStep - 1);
    } else {
      try {
        navigation.goBack();
      } catch (error) {}
    }
  };

  const onNext = () => {
    if (activeStep < 6) {
      setActiveStep(activeStep + 1);
    }
  };

  const onEndCreation = () => {
    try {
      navigation.goBack();
    } catch (error) {}
  };

  const renderStep = useCallback(() => {
    switch (activeStep) {
      case 0:
        return <SupervisorInfos onNext={onNext} onBack={onEndCreation} />;
      case 1:
        return <SelectHouse onNext={onNext} onBack={onBack} houses={houses} />;
        case 2:
        return <SaveNewSupervisor onNext={onEndCreation} onBack={onEndCreation} houses={houses} />;
      default:
        return <SupervisorInfos onNext={onNext} onBack={onBack} />;
    }
  }, [activeStep]);

  return (
    <SafeAreaView
      style={[SAFE_AREA_VIEW.container]}
      edges={["right", "left", "top"]}
    >
      {isLoading ? (
        <FullLoadingContainer />
      ) : (
        <>
          {activeStep >= 0 && activeStep < 3 && (
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <BackButton
                onClick={onBack}
                marginLeft={5}
                backgroundColor={APP_COLORS.PRIMARY_COLOR.color}
                iconColor={APP_COLORS.WHITE_COLOR.color}
              />
              <Text>Nouveau superviseur</Text>
            </View>
          )}
          {renderStep()}
        </>
      )}
    </SafeAreaView>
  );
}
