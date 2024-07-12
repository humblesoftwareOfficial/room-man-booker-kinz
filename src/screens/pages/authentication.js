import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState, useMemo, useEffect, useContext } from "react";
import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  parse,
} from "libphonenumber-js";
import * as Cellular from "expo-cellular";
import { SafeAreaView } from "react-native-safe-area-context";
import UserContext from "../../config/contexts/user";
import { COUNTRIES, getFlagEmoji, isFieldWithValue } from "../../utils/system";
import DefaultInput from "../../components/inputs/default-input";
import { AddItemToStorage } from "../../utils/local-database";
import { Authentication, UpdatePushTokens } from "../../config/endpoints/api";
import { SAFE_AREA_VIEW } from "../../styling/screens";
import { PROFILE_STYLE } from "../../styling/profile";
import { APP_COLORS } from "../../styling/color";
import CustomButton from "../../components/buttons/custom-button";
import FullLoadingContainer from "../../components/loaders/full-loading";
import { SYSTEM_STYLING } from "../../styling/system";
import { registerForPushNotificationsAsync } from "../../utils/token";

const defaultSNCountry = { country: "Senegal", code: "221", iso: "SN" };

export default function Login({ navigation }) {
  const { setAccount, account, setIsAuthenticated } = useContext(UserContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [defaultCountry, setDefaultCountry] = useState(null);
  const [showCountries, setShowCountries] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getCountryCode();
  }, []);

  useEffect(() => {
    if (defaultCountry) {
      setIsLoading(false);
    }
  }, [defaultCountry]);

  useEffect(() => {
    if (account) {
      setIsAuthenticated(true);
    }
  }, [account]);

  const renderPhoneInput = () => (
    <DefaultInput
      value={phoneNumber}
      placeholder="Numéro de téléphone"
      maxLength={100}
      onValueChange={(phone) => {
        setPhoneNumber(phone);
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

  const isValidUserPhone = useMemo(
    () =>
      isValidPhoneNumber(phoneNumber, defaultCountry?.iso) &&
      isPossiblePhoneNumber(phoneNumber, defaultCountry?.iso),
    [phoneNumber, defaultCountry]
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

  const onLogin = async () => {
    try {
      if (isFieldWithValue(phoneNumber) && isFieldWithValue(password)) {
        setMessage("Authentification en cours. Merci de patienter!");
        setIsLoading(true);
        const parsedNumber = parse(phoneNumber, defaultCountry.iso);
        const payload = {
          phone: `+${defaultCountry.code}${parsedNumber.phone}`,
          password,
        };
        const response = await Authentication(payload);
        const { data, success, message } = response.data;
        console.log({data})
        if (success) {
          if (data.company) {
            await AddItemToStorage("_company_code", data.company.code);
            await AddItemToStorage("_company_name", data.company.name);
            await AddItemToStorage(
              "_company_description",
              data.company?.description
            );
            await AddItemToStorage("_house_code", data.house?.code);
            await AddItemToStorage("_house_name", data.house?.name);
            await AddItemToStorage("_house_description", data.house?.description);
            await AddItemToStorage("_code", data.code);
            await AddItemToStorage("_phone", data.phone);
            await AddItemToStorage("_access_token", data.access_token);
            await AddItemToStorage("_firstName", data.firstName);
            await AddItemToStorage("_lastName", data.lastName);
            await AddItemToStorage("_pp", data.profile_picture);
            await AddItemToStorage("_ppkey", data.profile_picture_key);
            await AddItemToStorage("_address", data.address);
            await AddItemToStorage("_account_type", data.accountType);
            const token = await registerForPushNotificationsAsync();
            if (token && !data.push_tokens?.includes(token)) {
              try {
                await UpdatePushTokens(
                  {
                    user: data.code,
                    tokenValue: token,
                  },
                  data.access_token
                );
              } catch (error) {
                console.log({ error });
              }
            }
            setAccount({
              ...data,
              isAuthenticated: true,
            });
          } else {
            Alert.alert("INFO", "Vous n'êtes affiliés à aucune compagnie.");
          }
        } else {
          console.log(response.data);
          Alert.alert(
            "",
            "Informations d'identification incorrectes. Réessayer!"
          );
        }
        setIsLoading(false);
      } else {
        setHasError(true);
      }
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
      Alert.alert("Erreur", `${error}`);
    }
  };

  return (
    <SafeAreaView style={[SAFE_AREA_VIEW.container]}>
      <View style={PROFILE_STYLE.header}>
        <View>
          <Text style={SYSTEM_STYLING.app_name}>KINZ SAS</Text>
        </View>
      </View>
      {isLoading ? (
        <FullLoadingContainer text={message} />
      ) : (
        <>
          {renderPhoneInput()}
          <DefaultInput
            placeholder="Mot de passe"
            value={password}
            onValueChange={(value) => setPassword(value)}
            hasError={hasError && !isFieldWithValue(password)}
            isPassword
          />
          <CustomButton
            label="Se connecter"
            bgColor={APP_COLORS.PRIMARY_COLOR.color}
            onClick={onLogin}
          />
          <CustomButton
            label="Annuler"
            bgColor={APP_COLORS.RED_COLOR.color}
            // onClick={onAbort}
          />
        </>
      )}
    </SafeAreaView>
  );
}
