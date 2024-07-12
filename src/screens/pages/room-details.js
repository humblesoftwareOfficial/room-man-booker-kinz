import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SAFE_AREA_VIEW } from "../../styling/screens";
import RoomCard from "../../components/cards/room-card";
import {
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  Dimensions,
} from "react-native";
import { APP_COLORS } from "../../styling/color";
import { SYSTEM_STYLING } from "../../styling/system";
import BackButton from "../../components/buttons/back-button";
import { ROOM_DETAILS_STYLING } from "../../styling/cards";
import {
  EAccountType,
  ShowToastMessage,
  formatNumber,
  generateKey,
  PostImageToCDN,
} from "../../utils/system";
import {
  ROOM_PROPERTIES_TRADUCTION,
  getRoomPropertyIcon,
} from "../../utils/rooms";
import FullLoadingContainer from "../../components/loaders/full-loading";
import { GetRoomInfos, UpdateMediasPlace } from "../../config/endpoints/api";
import UserContext from "../../config/contexts/user";
import BottomModal from "../../components/modals/bottom-modal";
import CustomButton from "../../components/buttons/custom-button";
import DefaultModal from "../../components/modals/default-modal";
import RoomMedias from "./new-room/room-medias";
import NewRoomContext from "../../config/contexts/new-room";
import { newItemMedia } from "../../config/contexts/new-room-provider";

const MODAL_HEIGHT = Math.ceil(Dimensions.get("window").height / 3.5);

export default function RoomDetails({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [openOptions, setOpenOptions] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const { account } = useContext(UserContext);
  const { medias, setMedias } = useContext(NewRoomContext);

  useEffect(() => {
    if (!route.params?.data) {
      navigation.goBack();
    } else {
      getRoomInfos();
    }
    return () => {
      setMedias(
        new Array(10).fill(undefined).map((_, idx) => newItemMedia(idx))
      );
    };
  }, []);

  useEffect(() => {
    if (room) setIsLoading(false);
  }, [room]);

  const getRoomInfos = async () => {
    try {
      const { code } = route.params?.data;
      const response = await GetRoomInfos(code, account.access_token);
      const { success, data, message } = response.data;
      if (success) {
        setRoom(data);
        // console.log(data.reservationsCA);
      } else {
        ShowToastMessage(
          message,
          APP_COLORS.RED_COLOR.color,
          APP_COLORS.WHITE_COLOR.color
        );
        navigation.goBack();
      }
    } catch (error) {
      console.log({ error });
      navigation.goBack();
    }
  };

  const renderProperties = useCallback(
    () =>
      room?.properties?.map((property, index) => (
        <View
          style={ROOM_DETAILS_STYLING.property}
          key={index}
          nativeID={generateKey()}
        >
          <View style={ROOM_DETAILS_STYLING.property_icon}>
            <Text>{getRoomPropertyIcon(property)}</Text>
          </View>
          <View style={ROOM_DETAILS_STYLING.property_label}>
            <Text style={{ fontSize: 9 }}>
              {ROOM_PROPERTIES_TRADUCTION[property]}
            </Text>
          </View>
        </View>
      )),
    [room]
  );

  const onUpdateRoomPictures = () => {
    try {
      setOpenOptions(false);
      setOpenModalUpdate(true);
    } catch (error) {
      console.log({ error });
    }
  };

  const renderOptions = () => (
    <View
      style={[
        { flex: 1, flexDirection: "column-reverse" },
        SYSTEM_STYLING.platformMarginBottom,
      ]}
    >
      {/* <CustomButton
        label="Modifier les infos de la pièce"
        bgColor={APP_COLORS.PRIMARY_COLOR.color}
        textColor={APP_COLORS.WHITE_COLOR.color}
        // onClick={goToNewRoom}
      /> */}
      <CustomButton
        label="Modifier les images"
        bgColor={APP_COLORS.WHITE_COLOR.color}
        textColor={APP_COLORS.BLACK_COLOR.color}
        onClick={onUpdateRoomPictures}
      />
    </View>
  );

  const saveImages = async () => {
    setIsLoading(true);
    setOpenModalUpdate(false);
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
      await onUpdatePictures(mediasUrl);
    }
  };

  const onUpdatePictures = async (medias) => {
    try {
      setIsLoading(true);
      setOpenModalUpdate(false);
      const payload = {
        by: account.code,
        medias,
        place: room.code,
      }
      const response = await UpdateMediasPlace(payload, account.access_token);
      const { success, } = response.data;
      if (success) {
        ShowToastMessage("Photos mises à jour", APP_COLORS.GREEN_COLOR.color, APP_COLORS.WHITE_COLOR.color);
        getRoomInfos();
      }
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView
      style={SAFE_AREA_VIEW.container}
      edges={["right", "left", "top"]}
    >
      {/*  */}
      {isLoading ? (
        <FullLoadingContainer />
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={[ROOM_DETAILS_STYLING.header, { alignItems: "center" }]}>
            <View style={{ flexDirection: "row-reverse" }}>
              <BackButton
                onClick={() => navigation.goBack()}
                iconColor={APP_COLORS.WHITE_COLOR.color}
                backgroundColor={APP_COLORS.PRIMARY_COLOR.color}
              />
            </View>
            <View style={[ROOM_DETAILS_STYLING.title_header]}>
              <TouchableOpacity style={{}} onPress={() => setOpenOptions(true)}>
                <Text style={{ color: APP_COLORS.PRIMARY_COLOR.color }}>
                  Modifier
                </Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }}></View>
            </View>
          </View>
          <RoomCard data={room} onClick={() => null} />
          <View
            style={[
              ROOM_DETAILS_STYLING.section,
              {
                backgroundColor: APP_COLORS.WHITE_COLOR.color,
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ color: APP_COLORS.BLACK_COLOR.color }}>
                Maison
              </Text>
            </View>
            <View style={{ flexDirection: "row-reverse" }}>
              <Text
                style={[
                  ROOM_DETAILS_STYLING.house_name,
                  {
                    color: APP_COLORS.BLACK_COLOR.color,
                  },
                ]}
              >
                {room?.house.name}
              </Text>
            </View>
          </View>
          {account.accountType === EAccountType.ADMIN && (
            <>
              <View
                style={[
                  ROOM_DETAILS_STYLING.section,
                  {
                    backgroundColor: "#292437",
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ color: APP_COLORS.WHITE_COLOR.color }}>
                    Réservations
                  </Text>
                </View>
                <View style={{ flexDirection: "row-reverse" }}>
                  <Text style={ROOM_DETAILS_STYLING.house_name}>
                    {formatNumber(`${room?.reservations}`)}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  ROOM_DETAILS_STYLING.section,
                  {
                    backgroundColor: "#344A53",
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ color: APP_COLORS.WHITE_COLOR.color }}>
                    Chiffre d'affaire
                  </Text>
                </View>
                <View style={{ flexDirection: "row-reverse" }}>
                  <Text
                    style={[
                      ROOM_DETAILS_STYLING.house_name,
                      { fontWeight: "normal" },
                    ]}
                  >
                    {formatNumber(`${room?.reservationsCA?.amount}`)} XOF
                  </Text>
                </View>
              </View>
            </>
          )}
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 15 }}
          >
            {renderProperties()}
          </View>
        </ScrollView>
      )}
      <BottomModal
        showModal={openOptions}
        onClose={() => {
          setOpenOptions(false);
        }}
        content={renderOptions()}
        minHeight={MODAL_HEIGHT}
        backgroundColor="transparent"
        sliderBackgroundColor="rgba(0, 0, 0, 0.7)"
        overlay="rgba(0, 0, 0, 0.7)"
        borderRadius={0}
      />
      <DefaultModal
        show={openModalUpdate}
        onClose={() => setOpenModalUpdate(false)}
        content={
          <SafeAreaView
            style={SAFE_AREA_VIEW.container}
            edges={["right", "left", "top"]}
          >
            <RoomMedias
              onBack={() => setOpenModalUpdate(false)}
              onNext={() => saveImages()}
              customButtonTtile="Enregistrer"
              withCloseButton
            />
          </SafeAreaView>
        }
        animation="slide"
      />
    </SafeAreaView>
  );
}
