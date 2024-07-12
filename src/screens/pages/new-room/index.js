import { View, Text } from "react-native";
import React, { useState, useCallback, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NewRoomContext from "../../../config/contexts/new-room";
import { newItemMedia } from "../../../config/contexts/new-room-provider";
import Description from "./description";
import Price from "./price";
import RoomMedias from "./room-medias";
// import PlacePosition from "./PlacePosition";
import SaveNewRoom from "./save-new-room";
import { SAFE_AREA_VIEW } from "../../../styling/screens";
import BackButton from "../../../components/buttons/back-button";
import Properties from "./properties";
import RoomType from "./room-type";
import RoomRanking from "./room-ranking";
import { APP_COLORS } from "../../../styling/color";

export default function NewRoom({ navigation, route }) {
  const { setMedias, setNewRoom } = useContext(NewRoomContext);
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [house, setHouse] = useState(null);

  useEffect(() => {
    if (!route.params?.house) {
      navigation.goBack();
    } else {
      setHouse(route.params.house);
    }
    return () => {
      setNewRoom(null);
      setMedias(
        new Array(10).fill(undefined).map((_, idx) => newItemMedia(idx))
      );
    };
  }, []);

  useEffect(() => {
    if (house) {
      setIsLoading(false);
    }
  }, [house]);

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
        return <RoomType onNext={onNext} onBack={onEndCreation} />;
      case 1:
        return <Description onNext={onNext} onBack={onBack} />;
      case 2:
        return <Properties onNext={onNext} onBack={onBack} />;
      case 3:
        return <Price onNext={onNext} onBack={onBack} />;
      case 4:
        return <RoomMedias onNext={onNext} onBack={onBack} />;
      // case 5:
      //   return <PlacePosition onNext={onNext} onBack={onBack} />;
      case 5:
        return <RoomRanking onNext={onNext} onBack={onBack} />;
      case 6:
        return (
          <SaveNewRoom onNext={onEndCreation} onBack={onEndCreation} house={house} />
        );
      default:
        return <Description onNext={onNext} onBack={onBack} />;
    }
  }, [activeStep]);

  return (
    <SafeAreaView
      style={[SAFE_AREA_VIEW.container]}
      edges={["right", "left", "top"]}
    >
      {activeStep >= 0 && activeStep < 6 && (
        <View
          style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}
        >
          <BackButton
            onClick={onBack}
            marginLeft={5}
            backgroundColor={APP_COLORS.PRIMARY_COLOR.color}
            iconColor={APP_COLORS.WHITE_COLOR.color}
          />
          <Text>Nouvelle pièce</Text>
        </View>
      )}
      {renderStep()}
    </SafeAreaView>
  );
}
