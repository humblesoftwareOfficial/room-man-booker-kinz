import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";

import UserContext from "../../../config/contexts/user";
import { ShowToastMessage, isFieldWithValue } from "../../../utils/system";
import {
  SaveRequestReservation,
  SaveReservation,
} from "../../../config/endpoints/api";
import { APP_COLORS } from "../../../styling/color";
import FullLoadingContainer from "../../../components/loaders/full-loading";
import CustomButton from "../../../components/buttons/custom-button";
import NewReservationContext from "../../../config/contexts/new-reservation";
import { convertDateStringFormat } from "../../../utils/dates";

export default function SaveNewReservation({
  onNext,
  onBack,
  room,
  isForRequest,
}) {
  const { account } = useContext(UserContext);
  const { newReservation } = useContext(NewReservationContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    saveReservation();
  }, []);

  const saveReservation = async () => {
    try {
      const payload = {
        by: account.code,
        firstName: newReservation.firstName,
        lastName: newReservation.lastName,
        phone: newReservation.phone,
        identification: newReservation.identification,
        place: room.code,
        price: newReservation.price,
        startDate: `${convertDateStringFormat(newReservation.startDate)} ${
          newReservation?.timeStartHour
        }:${newReservation?.timeStartMinute}:00`,
        ...(isFieldWithValue(newReservation.endDate) ? {
          endDate: `${convertDateStringFormat(newReservation.endDate)} ${
            newReservation?.timeEndHour
          }:${newReservation?.timeEndMinute}:00`,
        }: {
          endDate: `${convertDateStringFormat(newReservation.startDate)} ${
            newReservation?.timeEndHour
          }:${newReservation?.timeEndMinute}:00`,
        }),
        ...(isFieldWithValue(newReservation.duration) && {
          duration: newReservation.duration,
        }),
      };
      const response = isForRequest
        ? await SaveRequestReservation(payload, account.access_token)
        : await SaveReservation(payload, account.access_token);
      const { data, success, message } = response.data;
      if (success) {
        const successMessage = isForRequest
          ? "Demande de réservation enregistrée avec succès."
          : "Réservation enregistrée avec succès.";
        ShowToastMessage(successMessage);
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
    saveReservation();
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
              Opération en cours. Veuillez patienter ...
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
