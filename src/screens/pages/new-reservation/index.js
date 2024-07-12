import { View, Text } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import NewReservationContext from "../../../config/contexts/new-reservation";
import { SafeAreaView } from "react-native-safe-area-context";
import { SAFE_AREA_VIEW } from "../../../styling/screens";
import BackButton from "../../../components/buttons/back-button";
import { APP_COLORS } from "../../../styling/color";
import UserInfos from "./user-infos";
import InfoComplements from "./info-complements";
import SaveNewReservation from "./save-new-reservation";
import ReservationPeriod from "./reservarion-period";
import ReservationTime from "./reservation-time";

export default function NewReservation({ navigation, route }) {
  const { newReservation, setNewReservation } = useContext(
    NewReservationContext
  );
  const [activeStep, setActiveStep] = useState(0);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    if (!route.params?.room) {
      navigation.goBack();
    } else {
      setRoom(route.params.room);
    }
    return () => {
      setNewReservation(null);
    };
  }, []);

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
    if (activeStep < 4) {
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
        return <UserInfos onNext={onNext} onBack={onEndCreation} />;
      case 1:
        return <ReservationPeriod onNext={onNext} onBack={onBack} />;
      case 2:
       return <ReservationTime onNext={onNext} onBack={onBack}/>
      case 3:
        return <InfoComplements onNext={onNext} onBack={onBack} />;
      case 4:
        return (
          <SaveNewReservation
            onNext={onEndCreation}
            onBack={onEndCreation}
            room={room}
          />
        );
      default:
        return <UserInfos onNext={onNext} onBack={onBack} />;
    }
  }, [activeStep]);

  return (
    <SafeAreaView
      style={[SAFE_AREA_VIEW.container]}
      edges={["right", "left", "top"]}
    >
      {activeStep >= 0 && activeStep < 4 && (
        <View
          style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}
        >
          <BackButton
            onClick={onBack}
            marginLeft={5}
            backgroundColor={APP_COLORS.PRIMARY_COLOR.color}
            iconColor={APP_COLORS.WHITE_COLOR.color}
          />
          <Text>Nouvelle réservation</Text>
        </View>
      )}
      {renderStep()}
    </SafeAreaView>
  );
}
