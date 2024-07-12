import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import NewRoomContext from "../../../config/contexts/new-room";
import UserContext from "../../../config/contexts/user";
import { PostImageToCDN, ShowToastMessage } from "../../../utils/system";
import { CreatePlace } from "../../../config/endpoints/api";
import { APP_COLORS } from "../../../styling/color";
import FullLoadingContainer from "../../../components/loaders/full-loading";
import CustomButton from "../../../components/buttons/custom-button";

export default function SaveNewRoom({ onNext, onBack, house }) {
  const { account } = useContext(UserContext);
  const { newRoom, medias } = useContext(NewRoomContext);
  const [isLoading, setIsLoading] = useState(true);
  const [stepUpload, setStepUpload] = useState(0);

  useEffect(() => {
    saveImages();
  }, []);

  const saveImages = async () => {
    const mediasUrl = [];
    let hasError = false;
    for (var i = 0; i < medias?.length; i++) {
      if (medias[i].image.base64) {
        const url = await PostImageToCDN(medias[i].image.base64);
        if (url) {
          mediasUrl.push({
            url,
          });
        } else {
          hasError = true;
          setIsLoading(false);
          console.log(`Medias upload error ....: ${i}`);
          throw new Error("Media upload failed");
        }
      }
    }
    if (!hasError) {
      await createPlace(mediasUrl);
    }
  };

  const createPlace = async (medias = []) => {
    try {
      const payload = {
        by: account.code,
        label: newRoom.label,
        description: newRoom.description,
        prices: newRoom.prices,
        type: newRoom.type,
        // position: {
        //   // ...newRoom.position,
        //   description: newRoom.address,
        //   // extras: newRoom.extras
        // },
        house: house.code,
        properties: newRoom.properties,
        medias,
        star: newRoom.star || 0,
      };
      const response = await CreatePlace(payload, account.access_token);
      const { data, success, message } = response.data;
      if (success) {
        ShowToastMessage("Enregistrement réussi.");
        onNext();
      } else {
        ShowToastMessage(
          "Une erreur s'est produite. Veuillez réessayer.",
          APP_COLORS.RED_COLOR.color,
          "#FFF"
        );
      }
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  const onRetry = () => {
    setIsLoading(true);
    saveImages();
  };

  const onCancelPublication = () => {
    onBack();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {isLoading ? (
        <>
          <View style={{ marginTop: 40 }}>
            <Text
              style={[
                {
                  fontSize: 20,
                  textAlign: "center",
                },
              ]}
            >
              Enregistrement de la place ...
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <FullLoadingContainer />
          </View>
        </>
      ) : (
        <>
          <Text
            style={[
              {
                // fontSize: 20,
                textAlign: "center",
                color: APP_COLORS.RED_COLOR.color,
              },
            ]}
          >
            Une erreur s'est produite. Veuillez réessayer.
          </Text>
          <CustomButton
            label="Réessayer"
            bgColor={APP_COLORS.PRIMARY_COLOR.color}
            textColor="#FFF"
            onClick={onRetry}
          />
          <CustomButton
            label="Annuler"
            bgColor={APP_COLORS.RED_COLOR.color}
            textColor="#FFF"
            onClick={onCancelPublication}
          />
        </>
      )}
    </View>
  );
}
