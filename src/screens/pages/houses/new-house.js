import { View, Text, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { SAFE_AREA_VIEW } from "../../../styling/screens";
import { APP_COLORS } from "../../../styling/color";
import { NEW_HOUSE_STYLE } from "../../../styling/rooms";
import BackButton from "../../../components/buttons/back-button";
import { SYSTEM_STYLING } from "../../../styling/system";
import DefaultInput from "../../../components/inputs/default-input";
import {
  SCREENS_NAME,
  VIEWS_NAME,
  isFieldWithValue,
} from "../../../utils/system";
import CustomButton from "../../../components/buttons/custom-button";
import FullLoadingContainer from "../../../components/loaders/full-loading";
import UserContext from "../../../config/contexts/user";
import { AddHouse, GetLocationName } from "../../../config/endpoints/api";

export default function NewHouse({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [position, setPosition] = useState(null);
  const { account } = useContext(UserContext);

  useEffect(() => {
    getCurrentPosition();
  }, []);

  useEffect(() => {
    if (position) {
      setIsLoading(false);
    }
  }, [position]);

  const onAddHouse = async () => {
    try {
      if (isFieldWithValue(name)) {
        setIsLoading(true);
        const payload = {
          name,
          description,
          address: address || position?.extras?.address?.road,
          by: account.code,
          company: account.company.code,
          position,
        };
        const response = await AddHouse(payload, account.access_token);
        const { success } = response.data;
        if (success) {
          navigation.goBack();
        } else {
          setIsLoading(false);
        }
      } else {
        setHasError(true);
      }
    } catch (error) {
      console.log({ error });
      Alert.alert("Erreur", "Une erreur est survenue. Merci de réessayer.");
      setIsLoading(false);
    }
  };

  const getCurrentPosition = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const response = await GetLocationName({
        latitude: location.coords.latitude,
        longitude:  location.coords.longitude,
      });
      setAddress(response.data?.display_name || "")
      setPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        extras: response.data,
      });
    } catch (error) {}
  };


  return (
    <SafeAreaView
      style={[
        SAFE_AREA_VIEW.container,
        {
          //   backgroundColor: APP_COLORS.WHITE_COLOR.color,-
        },
      ]}
      edges={["right", "left", "top"]}
    >
      <View style={NEW_HOUSE_STYLE.header}>
        <View style={{ flexDirection: "row-reverse" }}>
          <BackButton
            onClick={() => (isLoading ? null : navigation.goBack())}
            iconColor={APP_COLORS.WHITE_COLOR.color}
            backgroundColor={APP_COLORS.PRIMARY_COLOR.color}
          />
        </View>
        <View style={NEW_HOUSE_STYLE.title_header}>
          <Text style={SYSTEM_STYLING.title}>Nouvelle Maison</Text>
        </View>
      </View>
      {isLoading ? (
        <FullLoadingContainer text="Patientez un moment ..." />
      ) : (
        <View style={{ flex: 1 }}>
          <DefaultInput
            placeholder="* Nom de la maison (ou localisation)"
            value={name}
            onValueChange={(value) => setName(value)}
            hasError={hasError && !isFieldWithValue(name)}
          />
          <DefaultInput
            placeholder="* Adresse"
            value={address}
            onValueChange={(value) => setAddress(value)}
            hasError={hasError && !isFieldWithValue(address)}
            multiLine
            editable={false}
          />
          <DefaultInput
            placeholder="Ajouter une description ..."
            value={description}
            onValueChange={(value) => setDescription(value)}
            // hasError={hasError && !isFieldWithValue(description)}
          />
          <CustomButton
            label="Ajouter"
            bgColor={APP_COLORS.GREEN_COLOR.color}
            textColor={APP_COLORS.WHITE_COLOR.color}
            onClick={() => onAddHouse()}
          />
          <CustomButton
            label="Annuler"
            bgColor={APP_COLORS.RED_COLOR.color}
            textColor={APP_COLORS.WHITE_COLOR.color}
            onClick={() => navigation.goBack()}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
