import { View, Text, RefreshControl, Dimensions, Linking } from "react-native";
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
import { AcceptReservationRequest, DeclineReservationRequest, GetRequests, GetRooms, UpdateRoom } from "../../config/endpoints/api";
import FullLoadingContainer from "../loaders/full-loading";
import { SYSTEM_STYLING } from "../../styling/system";
import { ROOM_STATUS } from "../../utils/rooms";
import RequestCard from "../cards/request-card";
import { useDidMountEffect } from "../../config/hooks/useDidMountEffect";
import { ActivityIndicator } from "react-native-paper";

const MODAL_HEIGHT = Math.ceil(Dimensions.get("window").height / 2.7);

export default function ReservationsRequestsList({ navigation, selectedStatus, reload = 0, searchTerm = "" }) {
  const [requests, setRequests] = useState(null);
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
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [status, setStatus] = useState([EReservationStatus.ON_REQUEST]);
  const { account } = useContext(UserContext);
  useEffect(() => { 
    getRequests();
  }, [page]);

  useEffect(() => {
    if (requests) {
      setIsLoading(false);
      setIsGettingData(false);
    }
  }, [requests]);

  useEffect(() => {
    if (reload) onRefreshData()
  }, [reload]);

  useDidMountEffect(() => {
    setIsLoading(true);
    if (page === 1) {
      getRequests();
    } else {
      setPage(1);
    }
  }, [selectedStatus, searchTerm]);

  useEffect(() => {
    if (selectedRequest) setOpenInfos(true);
    else setOpenInfos(false);
  }, [selectedRequest]);

  const getRequests = async () => {
    try {
      const payload = {
        page,
        limit: 10,
        status: selectedStatus,
        searchTerm,
        by: account.code,
        ...(account?.accountType !== EAccountType.ADMIN && {
          house: account.house.code,
        })
      };
      const response = await GetRequests(payload, account.access_token);
      const { success, data, message } = response.data;
      if (success) {
        if (page === 1) {
          setRequests(data.reservations);
        } else {
          if (data.reservations?.length) {
            const newRequests = requests.concat(data.reservations);
            setRequests(newRequests);
          } else {
            setIsLoading(false);
            setIsGettingData(false);
          }
        }
        setLastRequestHasData(Boolean(data.reservations.length));
      } else {
        console.log({ message })
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
      <RequestCard
        data={item}
        key={item.code}
        onClick={onShowRequest}
        showProperty
      />
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
      getRequests();
    }
  };

  const onShowRequest = (value) => {
    try {
      if (account.accountType === EAccountType.ADMIN || value.place.house.code === account.house.code) {
        setSelectedRequest(value);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const callUser = async (phone) => {
    try {
      await Linking.openURL(`tel:${phone}`);
    } catch (error) {
      console.log({ error });
    }
  };

  const acceptRequest = async (start = false) => {
    try {
      const value = selectedRequest;
      setIsLoading(true);
      setOpenInfos(false);
      setSelectedRequest(null);
      const payload = {
        by: account.code,
        reservation: selectedRequest.code,
        start,
      };
      const response = await AcceptReservationRequest(payload, account.access_token);
      const { success, data, message } = response.data;
      if (success) {
        ShowToastMessage(`Réservation ${start ? 'démarrée' : 'acceptée'} avec succés`, APP_COLORS.PRIMARY_COLOR.color, APP_COLORS.WHITE_COLOR.color)
        onRefreshData();
      } else {
        ShowToastMessage(message, APP_COLORS.RED_COLOR.color, APP_COLORS.WHITE_COLOR.color);
        setIsLoading(false)
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

  const declineRequest = async () => {
    try {
      const value = selectedRequest;
      setIsLoading(true);
      setOpenInfos(false);
      setSelectedRequest(null);
      const payload = {
        by: account.code,
        reservation: selectedRequest.code,
      };
      const response = await DeclineReservationRequest(payload, account.access_token);
      const { success, data, message } = response.data;
      if (success) {
        ShowToastMessage("Réservation annulée avec succés", APP_COLORS.PRIMARY_COLOR.color, APP_COLORS.WHITE_COLOR.color)
        onRefreshData();
      } else {
        ShowToastMessage(message, APP_COLORS.RED_COLOR.color, APP_COLORS.WHITE_COLOR.color);
        setIsLoading(false)
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
      const value = selectedRequest.place;
      setOpenInfos(false);
      setSelectedRequest(null);
      navigation.navigate(SCREENS_NAME.RoomCurrentReservationDetails, {
        room: value,
        status: EReservationStatus.IN_PROGRESS,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  const goToExtendReservation = () => {
    try {
      const value = {...selectedRequest};
      setOpenInfos(false);
      setSelectedRequest(null);
      navigation.navigate(SCREENS_NAME.ExtendReservation, {
        reservation: value,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  const completeReservation = async () => {
    try {
      const value = selectedRequest.place;
      setIsLoading(true);
      setOpenInfos(false);
      setSelectedRequest(null);

      const payload = {
        by: account.code,
        place: value.code,
        currentStatus: ROOM_STATUS.AVAILABLE,
      }
      const response = await UpdateRoom(payload, account.access_token);
      const { success, data, message } = response.data;
      if (success) {
        ShowToastMessage("Réservation terminée avec succés", APP_COLORS.GREEN_COLOR.color, APP_COLORS.WHITE_COLOR.color)
        onRefreshData();
      } else {
        ShowToastMessage(message, APP_COLORS.RED_COLOR.color, APP_COLORS.WHITE_COLOR.color);
        setIsLoading(false)
      }
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
      ShowToastMessage("Une erreur est survenue. Veuillez réessayer.", APP_COLORS.RED_COLOR.color, APP_COLORS.WHITE_COLOR.color)
    }
  }

  const renderRequestOptions = useCallback(
    () => (
      <View
        style={[
          { flex: 1, flexDirection: "column-reverse" },
          SYSTEM_STYLING.platformMarginBottom,
        ]}
      >
        <CustomButton
          label="Appeler le client"
          bgColor={APP_COLORS.PRIMARY_COLOR.color}
          textColor={APP_COLORS.WHITE_COLOR.color}
          onClick={() => callUser(selectedRequest?.user?.phone)}
          borderWidth={1}
          borderColor={APP_COLORS.YELLOW_COLOR.color}
        />
        {selectedRequest?.status === EReservationStatus.ON_REQUEST && (
          <>
            <CustomButton
              label="Rejeter la demande"
              bgColor={APP_COLORS.RED_COLOR.color}
              textColor={APP_COLORS.WHITE_COLOR.color}
              onClick={() => declineRequest()}
            />
            <CustomButton
              label="Accepter la demande"
              bgColor={APP_COLORS.GREEN_COLOR.color}
              textColor={APP_COLORS.WHITE_COLOR.color}
              onClick={() => acceptRequest(false)}
            />
          </>
        )}
        {selectedRequest?.status === EReservationStatus.IN_PROGRESS && (
          <>
            <CustomButton
              label="Terminer la réservation"
              bgColor={APP_COLORS.RED_COLOR.color}
              onClick={completeReservation}
            />
            <CustomButton
              label="Prolonger la réservation en cours"
              bgColor={APP_COLORS.YELLOW_COLOR.color}
              textColor={APP_COLORS.BLACK_COLOR.color}
              borderWidth={1}
              borderColor={APP_COLORS.GREEN_COLOR.color}
              onClick={goToExtendReservation}
            />
            <CustomButton
              label="Voir la réservation en cours"
              bgColor={APP_COLORS.GREEN_COLOR.dark}
              onClick={goToReservationDetails}
            />
          </>
        )}
        {selectedRequest?.status === EReservationStatus.ACCEPTED && (
          <>
            <CustomButton
              label="Annuler la réservation"
              bgColor={APP_COLORS.RED_COLOR.color}
              textColor={APP_COLORS.WHITE_COLOR.color}
              onClick={() => declineRequest()}
            />
            <CustomButton
              label="Démarrer la réservation"
              bgColor={APP_COLORS.GREEN_COLOR.color}
              textColor={APP_COLORS.WHITE_COLOR.color}
              onClick={() => acceptRequest(true)}
              borderColor={APP_COLORS.YELLOW_COLOR.color}
              borderWidth={1}
            />
          </>
        )}
      </View>
    ),
    [selectedRequest]
  );

  return (
    <>
      {isLoading ? (
        <FullLoadingContainer />
      ) : (
          <FlatList
            style={{ backgroundColor: APP_COLORS.LIGHT_COLOR.color }}
            disableIntervalMomentum
            data={requests || []}
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
                progressBackgroundColor={APP_COLORS.WHITE_COLOR.color}
                colors={[APP_COLORS.PRIMARY_COLOR.color]}
              />
            }
            onRefresh={onRefreshData}
            onEndReached={() => onEndReached()}
            refreshing={isRefreshing}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              lastRequestHasData && (
                <View style={{ marginTop: 5, marginBottom: 10}}>
                  <ActivityIndicator
                  size="small"
                  color={APP_COLORS.PRIMARY_COLOR.color}
                />
                </View>
              )
            }
          />
      )}
      <BottomModal
        showModal={openInfos}
        onClose={() => {
          setOpenInfos(false);
          setSelectedRequest(null);
        }}
        content={renderRequestOptions()}
        minHeight={MODAL_HEIGHT}
        backgroundColor="transparent" //{APP_COLORS.LIGHT_COLOR.color}
        sliderBackgroundColor="transparent" //{APP_COLORS.PRIMARY_COLOR.color}
        overlay="rgba(0, 0, 0, 0.7)"
      />
    </>
  );
}
