import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import * as Cellular from "expo-cellular";
import { isPossiblePhoneNumber, isValidPhoneNumber } from "libphonenumber-js";

import UserContext from "../../../config/contexts/user";
import { NEW_ROOM_STYLE } from "../../../styling/rooms";
import CustomButton from "../../../components/buttons/custom-button";
import DefaultInput from "../../../components/inputs/default-input";
import { APP_COLORS } from "../../../styling/color";
import {
  COUNTRIES,
  getFlagEmoji,
  isFieldWithValue,
} from "../../../utils/system";

const defaultSNCountry = { country: "Senegal", code: "221", iso: "SN" };

export default function SupervisorInfos({ onBack, onNext }) {
  const { newSupervisor, setNewSupervisor } = useContext(UserContext);
  const [phoneNumber, setPhoneNumber] = useState(newSupervisor?.phone || "");
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
        setNewSupervisor({
          ...newSupervisor,
          phone,
          defaultCountry,
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
      {/* <View style={NEW_ROOM_STYLE.header}>
        <Text style={NEW_ROOM_STYLE.title}>Informations</Text>
      </View> */}
      <View>
        <DefaultInput
          placeholder="Prénom"
          onValueChange={(firstName) =>
            setNewSupervisor({ ...newSupervisor, firstName })
          }
          value={newSupervisor?.firstName || ""}
        />
        <DefaultInput
          placeholder="Nom"
          onValueChange={(lastName) =>
            setNewSupervisor({ ...newSupervisor, lastName })
          }
          value={newSupervisor?.lastName || ""}
        />
        {renderPhoneInput()}
        <CustomButton
          label="Suivant"
          bgColor={APP_COLORS.PRIMARY_COLOR.color}
          textColor={APP_COLORS.WHITE_COLOR.color}
          onClick={onNext}
          disable={
            !isFieldWithValue(newSupervisor?.firstName) ||
            !isFieldWithValue(newSupervisor?.lastName) ||
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
    </View>
  );
}
