import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";

import UserContext from "../../../config/contexts/user";
import { ShowToastMessage } from "../../../utils/system";
import { AddNewSupervisorToHouses } from "../../../config/endpoints/api";
import { APP_COLORS } from "../../../styling/color";
import FullLoadingContainer from "../../../components/loaders/full-loading";
import CustomButton from "../../../components/buttons/custom-button";
import { parse } from "libphonenumber-js";

export default function SaveNewSupervisor({ onNext, onBack, room }) {
  const { account, newSupervisor } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    addSupervisor();
  }, []);

  const addSupervisor = async () => {
    try {
      const parsedNumber = parse(newSupervisor.phone, newSupervisor.defaultCountry.iso);

      const payload = {
        by: account.code,
        user: {
          firstName: newSupervisor.firstName,
          lastName: newSupervisor.lastName,
          phone: `+${newSupervisor.defaultCountry.code}${parsedNumber.phone}`,
        },
        house: newSupervisor.house,
      };
      const response = await AddNewSupervisorToHouses(
        payload,
        account.access_token
      );
      const { data, success, message } = response.data;
      if (success) {
        ShowToastMessage("Superviseur ajouté avec succès.");
        onNext();
      } else {
        ShowToastMessage(
          "Une erreur s'est produite. Veuillez réessayer.",
          APP_COLORS.RED_COLOR.color,
          "#FFF"
        );
        setIsLoading(false);
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

  const onCancel = () => {
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
              Ajout d'un nouveau superviseur ...
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
            onClick={onCancel}
          />
        </>
      )}
    </View>
  );
}
