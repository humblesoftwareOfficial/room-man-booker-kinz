import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import * as Cellular from "expo-cellular";

import {
  COUNTRIES,
  getFlagEmoji,
  isFieldWithValue,
} from "../../../utils/system";
import { APP_COLORS } from "../../../styling/color";
import CustomButton from "../../../components/buttons/custom-button";
import DefaultInput from "../../../components/inputs/default-input";
import { NEW_ROOM_STYLE } from "../../../styling/rooms";
import NewReservationContext from "../../../config/contexts/new-reservation";
import { isPossiblePhoneNumber, isValidPhoneNumber } from "libphonenumber-js";
import FullLoadingContainer from "../../../components/loaders/full-loading";

const defaultSNCountry = { country: "Senegal", code: "221", iso: "SN" };

export default function UserInfos({ onNext, onBack }) {
  const { newReservation, setNewReservation } = useContext(
    NewReservationContext
  );
  const [phoneNumber, setPhoneNumber] = useState(newReservation?.phone || "");
  const [defaultCountry, setDefaultCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCountries, setShowCountries] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getCountryCode();
  }, []);

  useEffect(() => {
    if (defaultCountry) {
      setIsLoading(false);
    }
  }, [defaultCountry]);

  const isValidUserPhone = useMemo(
    () =>
      isValidPhoneNumber(phoneNumber, defaultCountry?.iso) &&
      isPossiblePhoneNumber(phoneNumber, defaultCountry?.iso),
    [phoneNumber, defaultCountry]
  );

  const renderPhoneInput = () => (
    <DefaultInput
      value={phoneNumber}
      placeholder="Numéro de téléphone"
      maxLength={100}
      onValueChange={(phone) => {
        setPhoneNumber(phone);
        setNewReservation({
          ...newReservation,
          phone,
        });
      }}
      textAlignCenter
      keyboardType="phone-pad"
      hasError={
        (isFieldWithValue(phoneNumber) && !isValidUserPhone) ||
        (hasError && !isFieldWithValue(phoneNumber))
      }
      withPrefix
      topPrefix={17}
      prefix={
        <TouchableOpacity
          onPress={() => setShowCountries(true)}
          style={{ backgroundColor: "transparent" }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {`${getFlagEmoji(defaultCountry?.iso || "")}`}
          </Text>
        </TouchableOpacity>
      }
    />
  );

  const getCountryCode = async () => {
    const isoCode = await Cellular.getIsoCountryCodeAsync();
    if (isoCode) {
      const country = COUNTRIES.find(
        (c) => c.iso === isoCode.toLocaleUpperCase()
      );
      if (country) {
        setDefaultCountry(country);
      } else {
        setDefaultCountry(defaultSNCountry);
      }
    } else {
      setDefaultCountry(defaultSNCountry);
    }
  };

  return (
    <View style={NEW_ROOM_STYLE.container}>
      {isLoading ? (
        <FullLoadingContainer />
      ) : (
        <>
          <View style={NEW_ROOM_STYLE.header}>
            <Text style={NEW_ROOM_STYLE.title}>Informations du client</Text>
          </View>
          <View>
            <DefaultInput
              placeholder="Prénom"
              onValueChange={(firstName) =>
                setNewReservation({ ...newReservation, firstName })
              }
              value={newReservation?.firstName || ""}
              hasError={hasError && !isFieldWithValue(newReservation.firstName)}
            />
            <DefaultInput
              placeholder="Nom"
              onValueChange={(lastName) =>
                setNewReservation({ ...newReservation, lastName })
              }
              value={newReservation?.lastName || ""}
              hasError={hasError && !isFieldWithValue(newReservation.lastName)}
            />
            {renderPhoneInput()}
            <CustomButton
              label="Suivant"
              bgColor={APP_COLORS.PRIMARY_COLOR.color}
              textColor={APP_COLORS.WHITE_COLOR.color}
              onClick={onNext}
              disable={
                !isFieldWithValue(newReservation?.firstName) ||
                !isFieldWithValue(newReservation?.lastName) ||
                !isValidUserPhone
              }
            />
            <CustomButton
              label="Annuler"
              textColor={APP_COLORS.RED_COLOR.color}
              onClick={onBack}
              bgColor="transparent"
            />
          </View>
        </>
      )}
    </View>
  );
}
