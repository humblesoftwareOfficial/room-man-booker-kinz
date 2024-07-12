import { View, Text } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import NewReservationContext from "../../../config/contexts/new-reservation";
import { SafeAreaView } from "react-native-safe-area-context";
import { SAFE_AREA_VIEW } from "../../../styling/screens";
import BackButton from "../../../components/buttons/back-button";
import { APP_COLORS } from "../../../styling/color";
import ReservationPeriod from "../new-reservation/reservarion-period";
import ExtendDetails from "./extend-details";
import FullLoadingContainer from "../../../components/loaders/full-loading";
import ExtendTime from "./extend-time";
import ExtendPrice from "./extend-price";
import SaveExtendReservation from "./save-extend-reservation";
// import UserInfos from "./user-infos";
// import InfoComplements from "./info-complements";
// import SaveNewReservation from "./save-new-reservation";
// import ReservationPeriod from "./reservarion-period";
// import ReservationTime from "./reservation-time";

export default function ExtendReservation({ navigation, route }) {
  const { newReservation, setNewReservation } = useContext(
    NewReservationContext
  );
  const [activeStep, setActiveStep] = useState(0);
  const [reservation, setReservation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!route.params?.reservation) {
      navigation.goBack();
    } else {
      const endDate = new Date(route.params.reservation.endDate);
      setNewReservation({
        ...newReservation,
        timeEndHour: `${endDate.getHours()}`,
        timeEndMinute: `${endDate.getMinutes()}`,
      });
      setReservation(route.params.reservation);
    }
    return () => {
      setNewReservation(null);
    };
  }, []);

  useEffect(() => {
    if (reservation) setIsLoading(false);
  }, [reservation]);

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
    if (activeStep < 3) {
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
        return (
          <ExtendDetails
            onNext={onNext}
            onBack={onEndCreation}
            reservation={reservation}
            endDate={reservation?.endDate}
          />
        );
      case 1:
        return <ExtendTime onNext={onNext} onBack={onBack} />;
      case 2:
        return (
          <ExtendPrice
            onNext={onNext}
            onBack={onBack}
            oldPrice={reservation?.price?.value}
          />
        );
      case 3:
        return (
          <SaveExtendReservation
            onNext={onEndCreation}
            onBack={onBack}
            reservation={reservation}
          />
        );
      default:
        return <ExtendDetails onNext={onNext} onBack={onBack} />;
    }
  }, [activeStep, reservation]);

  return (
    <SafeAreaView
      style={[SAFE_AREA_VIEW.container]}
      edges={["right", "left", "top"]}
    >
      {activeStep >= 0 && activeStep < 3 && (
        <View
          style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}
        >
          <BackButton
            onClick={onBack}
            marginLeft={5}
            backgroundColor={APP_COLORS.PRIMARY_COLOR.color}
            iconColor={APP_COLORS.WHITE_COLOR.color}
          />
          <Text>Prolonger la réservation</Text>
        </View>
      )}
      {isLoading ? <FullLoadingContainer /> : renderStep()}
    </SafeAreaView>
  );
}
