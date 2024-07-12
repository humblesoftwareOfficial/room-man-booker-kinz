import React, { useContext, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";

import { MAPS_STYLE, NEW_ROOM_STYLE } from "../../../styling/place";
import NewPlaceContext from "../../../contexts/NewPlace";
import DefaultInput from "../../../components/inputs/DefaultInput";
import CustomButton from "../../../components/buttons/CustomButton";
import { APP_COLORS } from "../../../styling/system";
import { isFieldWithValue } from "../../../utils";
import { useEffect } from "react";
import MapSearchInput from "../../../components/inputs/MapSearchInput";
import DefaultModal from "../../../components/modals/DefaultModal";
import { SAFE_AREA_VIEW } from "../../../styling/screen";
import { SafeAreaView } from "react-native-safe-area-context";

const dakarRegion = {
  latitude: 14.6919,
  longitude: -17.4474,
};

export default function PlacePosition({ onNext, onBack }) {
  const { newPlace, setNewPlace } = useContext(NewPlaceContext);
  const [position, setPosition] = useState(newPlace?.position || dakarRegion);
  const [openModal, setOpenModal] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    getCurrentPosition();
  }, []);

  const onChoosePoint = (value) => {
    try {
      const coordinate = value.nativeEvent.coordinate;
      setNewPlace({
        ...newPlace,
        position: {
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        },
      });
      setPosition({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      });
      setOpenModal(true);
    } catch (error) {
      console.log({ error });
    }
  };

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      const data = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setNewPlace({
        ...newPlace,
        position: {
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
        },
        extras: {
          ...data.coords,
        },
      });
      setPosition({
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      });
      setOpenModal(true);
    } catch (error) {}
  };

  const getCurrentPosition = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      const data = await Location.getCurrentPositionAsync({});
      setPosition({
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      });
    } catch (error) {}
  };

  const onSelectAddress = ({ data, details }) => {
    try {
      const newPosition = {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      };
      setNewPlace({
        ...newPlace,
        address: data.description,
        position: {
          latitude: newPosition.latitude,
          longitude: newPosition.longitude,
        },
        extras: {
          ...data,
          ...details,
        },
      });
      setPosition({
        latitude: newPosition.latitude,
        longitude: newPosition.longitude,
      });
    } catch (error) {}
  };

  const closeModal = () => {
    setOpenModal(false);
  }

  return (
    <View style={NEW_ROOM_STYLE.container}>
      <View style={NEW_ROOM_STYLE.header}>
        <Text style={NEW_ROOM_STYLE.title}>Adresse / Localisation </Text>
      </View>
      {/* <DefaultInput
        placeholder="Adresse"
        onValueChange={(address) => setNewPlace({ ...newPlace, address })}
        value={newPlace?.address || ""}
      /> */}
      <MapSearchInput
        onSelectAddress={onSelectAddress}
        defaultValueInput={newPlace?.address}
      />
      <View style={styles.container}>
        <MapView
          style={styles.map}
          onPress={onChoosePoint}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
        >
          <Marker coordinate={newPlace?.position || position} />
        </MapView>
      </View>
      <CustomButton
        label="Ma position actuelle"
        textColor={APP_COLORS.RED_COLOR.color}
        onClick={getLocation}
        bgColor="transparent"
      />
      <CustomButton
        label="Suivant"
        textColor={APP_COLORS.PRIMARY_COLOR.color}
        onClick={onNext}
        disable={!isFieldWithValue(newPlace?.address)}
      />
      <DefaultModal
        show={openModal}
        onClose={closeModal}
        backgroundColor="#FFF"
        content={
          <SafeAreaView style={[SAFE_AREA_VIEW.container]}>
            <DefaultInput
              placeholder="Description de l'addresse"
              onValueChange={(address) => setNewPlace({ ...newPlace, address })}
              value={newPlace?.address || ""}
            />
            <CustomButton
              label="Enregistrer"
              textColor={APP_COLORS.PRIMARY_COLOR.color}
              onClick={closeModal}
              disable={!isFieldWithValue(newPlace?.address)}
            />
          </SafeAreaView>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
