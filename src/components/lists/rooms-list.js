import { View, Text, RefreshControl, Dimensions } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import RoomCard from "../cards/room-card";
import { FlatList } from "react-native-gesture-handler";
import { APP_COLORS } from "../../styling/color";
import {
  EAccountType,
  EReservationStatus,
  SCREENS_NAME,
  ShowToastMessage,
  generateKey,
} from "../../utils/system";
import BottomModal from "../modals/bottom-modal";
import CustomButton from "../buttons/custom-button";
import UserContext from "../../config/contexts/user";
import { GetRooms, UpdateRoom } from "../../config/endpoints/api";
import FullLoadingContainer from "../loaders/full-loading";
import { SYSTEM_STYLING } from "../../styling/system";
import { ROOM_STATUS } from "../../utils/rooms";

const MODAL_HEIGHT = Math.ceil(Dimensions.get("window").height / 2.7);

export default function RoomsList({ navigation, house = null }) {
  const [rooms, setRooms] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isGettingData, setIsGettingData] = useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
  const [page, setPage] = useState(1);
  const [lastRequestHasData, setLastRequestHasData] = useState(false);
  const [openInfos, setOpenInfos] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const { account } = useContext(UserContext);

  useEffect(() => {
    getPlaces();
  }, [page]);

  useEffect(() => {
    if (rooms) {
      setIsLoading(false);
      setIsGettingData(false);
    }
  }, [rooms]);

  useEffect(() => {
    if (selectedPlace) setOpenInfos(true);
    else setOpenInfos(false);
  }, [selectedPlace]);

  const getPlaces = async () => {
    try {
      const payload = {
        page,
        limit: 10,
        houses: [house.code],
      };
      const response = await GetRooms(payload, account.access_token);
      const { success, data } = response.data;
      if (success) {
        if (page === 1) {
          setRooms(data.places);
        } else {
          if (data.places?.length) {
            const newRooms = rooms.concat(data.places);
            setRooms(newRooms);
          } else {
            setIsLoading(false);
            setIsGettingData(false);
          }
        }
        setLastRequestHasData(Boolean(data.places.length));
      } else {
        setLastRequestHasData(false);
        setIsLoading(false);
        setIsGettingData(false);
      }
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
    }
  };

  const keyExtractor = useCallback((item) => item.code, []);

  const renderItems = useCallback(
    ({ item, index }) => (
      <RoomCard data={item} key={item.code} onClick={onOpenPlace} />
    ),
    []
  );

  const onEndReached = () => {
    if (lastRequestHasData) {
      if (!isLoading && !isGettingData) {
        setIsGettingData(true);
        setPage(page + 1);
      }
    } else {
      setIsGettingData(false);
    }
  };

  const onRefreshData = () => {
    setIsLoading(true);
    if (page > 1) {
      setPage(1);
    } else {
      getPlaces();
    }
  };

  const onOpenPlace = (place) => {
    try {
      if (
        account.accountType === EAccountType.ADMIN ||
        place.house.code === account.house.code
      ) {
        setSelectedPlace(place);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const goToRoomDetails = () => {
    try {
      const value = selectedPlace;
      setOpenInfos(false);
      setSelectedPlace(null);
      navigation.navigate(SCREENS_NAME.RoomDetails, {
        data: value,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const goToNewReservation = () => {
    try {
      const value = selectedPlace;
      setOpenInfos(false);
      setSelectedPlace(null);
      navigation.navigate(SCREENS_NAME.NewReservation, {
        room: value,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const goToNewRequestReservation = () => {
    try {
      const value = selectedPlace;
      setOpenInfos(false);
      setSelectedPlace(null);
      navigation.navigate(SCREENS_NAME.RequestReservation, {
        room: value,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const completeReservation = async () => {
    try {
      const value = selectedPlace;
      setIsLoading(true);
      setOpenInfos(false);
      setSelectedPlace(null);

      const payload = {
        by: account.code,
        place: value.code,
        currentStatus: ROOM_STATUS.AVAILABLE,
      };
      const response = await UpdateRoom(payload, account.access_token);
      const { success, data } = response.data;
      if (success) {
        onRefreshData();
      }
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
      ShowToastMessage(
        "Une erreur est survenue. Veuillez réessayer.",
        APP_COLORS.RED_COLOR.color,
        APP_COLORS.WHITE_COLOR.color
      );
    }
  };

  const goToReservationDetails = () => {
    try {
      const value = selectedPlace;
      setOpenInfos(false);
      setSelectedPlace(null);
      navigation.navigate(SCREENS_NAME.RoomCurrentReservationDetails, {
        room: value,
        status: EReservationStatus.IN_PROGRESS,
      });
    } catch (error) {
      console.log({ error });
      console.log("herreerrrrr");
    }
  };

  const renderRoomDetailsInfos = useCallback(
    () => (
      <View
        style={[
          { flex: 1, flexDirection: "column-reverse" },
          SYSTEM_STYLING.platformMarginBottom,
        ]}
      >
        {selectedPlace?.currentStatus === "TAKEN" && (
          <>
            <CustomButton
              label="Terminer la réservation"
              bgColor={APP_COLORS.RED_COLOR.color}
              onClick={completeReservation}
            />
            <CustomButton
              label="Voir la réservation en cours"
              bgColor={APP_COLORS.GREEN_COLOR.dark}
              onClick={goToReservationDetails}
            />
          </>
        )}
        {selectedPlace?.currentStatus === "AVAILABLE" && (
          <CustomButton
            label="Nouvelle réservation"
            bgColor={APP_COLORS.PRIMARY_COLOR.color}
            onClick={() => goToNewReservation()}
          />
        )}
        <CustomButton
          label="Nouvelle demande de réservation"
          bgColor={APP_COLORS.YELLOW_COLOR.color}
          textColor={APP_COLORS.BLACK_COLOR.color}
          onClick={() => goToNewRequestReservation()}
          borderWidth={1}
          borderColor={APP_COLORS.PRIMARY_COLOR.color}
        />
        <CustomButton
          label="Détails de la pièce"
          bgColor={APP_COLORS.WHITE_COLOR.color}
          textColor={APP_COLORS.BLACK_COLOR.color}
          onClick={() => goToRoomDetails()}
        />
      </View>
    ),
    [selectedPlace]
  );

  return (
    <>
      {isLoading ? (
        <FullLoadingContainer />
      ) : (
        <FlatList
          style={{ backgroundColor: APP_COLORS.LIGHT_COLOR.color }}
          disableIntervalMomentum
          data={rooms || []}
          renderItem={renderItems}
          keyExtractor={keyExtractor}
          maxToRenderPerBatch={6}
          onEndReachedThreshold={0.5}
          updateCellsBatchingPeriod={100}
          initialNumToRender={6}
          onMomentumScrollBegin={() => {
            setOnEndReachedCalledDuringMomentum(false);
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefreshData}
              tintColor={APP_COLORS.PRIMARY_COLOR.color}
              progressBackgroundColor={APP_COLORS.PRIMARY_COLOR.color}
              colors={[APP_COLORS.PRIMARY_COLOR.color]}
            />
          }
          onRefresh={onRefreshData}
          onEndReached={() => onEndReached()}
          refreshing={isRefreshing}
          showsVerticalScrollIndicator={false}
          //   ListHeaderComponent={<Sponsorized onPressItem={onOpenPlace} />}
          //   ListFooterComponent={
          //     isRetreivingData && (
          //       <ActivityIndicator
          //         size="small"
          //         color={APP_COLORS.YELLOW_COLOR.color}
          //       />
          //     )
          //   }
        />
      )}
      <BottomModal
        showModal={openInfos}
        onClose={() => {
          setOpenInfos(false);
          setSelectedPlace(null);
        }}
        content={renderRoomDetailsInfos()}
        minHeight={MODAL_HEIGHT}
        backgroundColor="transparent" //{APP_COLORS.LIGHT_COLOR.color}
        sliderBackgroundColor="transparent" //{APP_COLORS.PRIMARY_COLOR.color}
        overlay="rgba(0, 0, 0, 0.7)"
      />
    </>
  );
}
