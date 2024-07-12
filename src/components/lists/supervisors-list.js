import { View, Text, RefreshControl, Dimensions } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";

import { FlatList } from "react-native-gesture-handler";
import { APP_COLORS } from "../../styling/color";
import { EAccountType, ShowToastMessage } from "../../utils/system";
import BottomModal from "../modals/bottom-modal";
import CustomButton from "../buttons/custom-button";
import UserContext from "../../config/contexts/user";
import { GetUsers, RemoveUserOnCompany } from "../../config/endpoints/api";
import FullLoadingContainer from "../loaders/full-loading";
import { SYSTEM_STYLING } from "../../styling/system";
import SupervisorCard from "../cards/supervisor-card";

const MODAL_HEIGHT = Math.ceil(Dimensions.get("window").height / 2.7);

export default function SupervisorsList({ navigation, company = null }) {
  const [supervisors, setSupervisors] = useState(null);
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
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const { account } = useContext(UserContext);

  useEffect(() => {
    getUsers();
  }, [page]);

  useEffect(() => {
    if (supervisors) {
      setIsLoading(false);
      setIsGettingData(false);
    }
  }, [supervisors]);

  useEffect(() => {
    if (selectedSupervisor) setOpenInfos(true);
    else setOpenInfos(false);
  }, [selectedSupervisor]);

  const getUsers = async () => {
    try {
      const payload = {
        page,
        limit: 10,
        company: account.company.code,
        roles: [EAccountType.SUPERVISOR],
      };
      const response = await GetUsers(payload, account.access_token);
      const { success, data } = response.data;
      if (success) {
        if (page === 1) {
          setSupervisors(data.users);
        } else {
          if (data.users?.length) {
            const newData = supervisors.concat(data.users);
            setSupervisors(newData);
          } else {
            setIsLoading(false);
            setIsGettingData(false);
          }
        }
        setLastRequestHasData(Boolean(data.users.length));
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
    ({ item, index }) =>
      item.code !== account.code ? (
        <SupervisorCard
          user={item}
          key={item.code}
          onClick={onSelectSupervisor}
        />
      ) : null,
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
      getUsers();
    }
  };

  const onSelectSupervisor = (user) => {
    try {
      setSelectedSupervisor(user);
    } catch (error) {
      console.log({ error });
    }
  };

  const onRemoveUser = async () => {
    try {
      setOpenInfos(false);
      setIsLoading(true);
      const payload = {
        user: selectedSupervisor.code,
        by: account.code,
      };
      const response = await RemoveUserOnCompany(payload, account.access_token);
      const { success, message } = response.data;
      setSelectedSupervisor(null);
      if (success) {
        onRefreshData();
        ShowToastMessage(
          "Compte retiré",
          APP_COLORS.PRIMARY_COLOR.color,
          APP_COLORS.WHITE_COLOR.color
        );
      } else {
        setIsLoading(false);
        ShowToastMessage(
          message,
          APP_COLORS.RED_COLOR.color,
          APP_COLORS.WHITE_COLOR.color
        );
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const renderUserDetailsInfos = useCallback(
    () => (
      <View
        style={[
          { flex: 1, flexDirection: "column-reverse" },
          SYSTEM_STYLING.platformMarginBottom,
        ]}
      >
        <CustomButton
          label="Retirer ce compte"
          bgColor={APP_COLORS.RED_COLOR.color}
          textColor={APP_COLORS.WHITE_COLOR.color}
          onClick={() => onRemoveUser()}
        />
        <Text
          style={{ textAlign: "center", color: "#FFF" }}
        >{`${selectedSupervisor?.firstName} ${selectedSupervisor?.lastName}`}</Text>
      </View>
    ),
    [selectedSupervisor]
  );

  return (
    <>
      {isLoading ? (
        <FullLoadingContainer />
      ) : (
        <FlatList
          style={{ backgroundColor: APP_COLORS.LIGHT_COLOR.color }}
          disableIntervalMomentum
          data={supervisors || []}
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
          setSelectedSupervisor(null);
        }}
        content={renderUserDetailsInfos()}
        minHeight={MODAL_HEIGHT}
        backgroundColor="transparent" //{APP_COLORS.LIGHT_COLOR.color}
        sliderBackgroundColor="transparent" //{APP_COLORS.PRIMARY_COLOR.color}
        overlay="rgba(0, 0, 0, 0.7)"
      />
    </>
  );
}
