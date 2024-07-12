import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SAFE_AREA_VIEW } from "../../styling/screens";
import FullLoadingContainer from "../../components/loaders/full-loading";
import ProfileHeader from "../../components/headers/profile-header";
import { PROFILE_STYLE } from "../../styling/profile";
import { AntDesign, Feather } from "@expo/vector-icons";
import { APP_COLORS } from "../../styling/color";
import UserContext from "../../config/contexts/user";
import { EAccountType, SCREENS_NAME, truncateText } from "../../utils/system";
import { removeStorageInfos } from "../../utils/local-database";

export default function Profile({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const { account, setAccount, setIsAuthenticated} = useContext(UserContext);

  useEffect(() => {
    if (account) setIsLoading(false);
    else {
      navigation.navigate(SCREENS_NAME.Login);
    }
  }, []);

  const onLogout = async () => {
    try {
      setIsLoading(true);
      await removeStorageInfos();
      setAccount(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
    }
  }

  const addSupervisor = () => {
    try {
      navigation.navigate(SCREENS_NAME.NewSupervisor);
    } catch (error) {
      console.log({ error });
    }
  };

  const listSupervisors = () => {
    try {
      navigation.navigate(SCREENS_NAME.Supervisors);
    } catch (error) {
      console.log({ error })
    }
  };

  return (
    <SafeAreaView
      style={[SAFE_AREA_VIEW.container, {}]}
      edges={["right", "left", "top"]}
    >
      <ProfileHeader onLogout={onLogout} />
      {isLoading ? (
        <FullLoadingContainer />
      ) : (
        <View style={PROFILE_STYLE.container}>
          <View style={PROFILE_STYLE.top_section}>
            <View style={PROFILE_STYLE.profile_image}>
              <View style={PROFILE_STYLE.default_image}>
                <Feather
                  name="user"
                  size={24}
                  color={APP_COLORS.WHITE_COLOR.color}
                />
              </View>
            </View>
            <View
              style={{ alignItems: "center", marginTop: 10, marginBottom: 15 }}
            >
              <Text style={PROFILE_STYLE.profile_infos_name}>
                {truncateText(`${account?.firstName} ${account?.lastName}`, 45)}
              </Text>
              
              <View style={{ marginTop: 5 }}>
                <Text style={PROFILE_STYLE.profile_infos_phone}>
                  {account?.phone}
                </Text>
              </View>
              {account?.accountType === EAccountType.ADMIN && (
                <Text
                  style={[PROFILE_STYLE.profile_infos_name, { color: "#000" }]}
                >
                  ADMINISTRATEUR
                </Text>
              )}
            </View>
          </View>
          {account?.accountType === EAccountType.ADMIN && (
            <>
              <TouchableOpacity
                style={[
                  PROFILE_STYLE.account_options_item,
                  {
                    backgroundColor: APP_COLORS.WHITE_COLOR.color,
                  },
                ]}
                onPress={listSupervisors}
              >
                <Feather
                  name="users"
                  size={20}
                  color={APP_COLORS.BLACK_COLOR.color}
                />
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ color: APP_COLORS.BLACK_COLOR.color }}>
                    Mes superviseurs
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  PROFILE_STYLE.account_options_item,
                  {
                    backgroundColor: APP_COLORS.WHITE_COLOR.color,
                  },
                ]}
                onPress={addSupervisor}
              >
                <Feather
                  name="user-plus"
                  size={20}
                  color={APP_COLORS.GREEN_COLOR.color}
                />
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ color: APP_COLORS.GREEN_COLOR.color }}>
                    Nouveau superviseur
                  </Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={[
                  PROFILE_STYLE.account_options_item,
                  {
                    backgroundColor: APP_COLORS.WHITE_COLOR.color,
                  },
                ]}
                onPress={removeSupervisor}
              >
                <Feather
                  name="user-minus"
                  size={24}
                  color={APP_COLORS.RED_COLOR.color}
                />
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ color: APP_COLORS.RED_COLOR.color }}>
                    Retirer un superviseur
                  </Text>
                </View>
              </TouchableOpacity> */}
            </>
          )}
          <TouchableOpacity style={PROFILE_STYLE.developer}>
            <Text style={PROFILE_STYLE.made_by}>
              {`Made with `}
              <AntDesign
                name="heart"
                size={11}
                color={APP_COLORS.YELLOW_COLOR.color}
              />
              {" by"}
            </Text>
            <Text style={PROFILE_STYLE.developer_infos}>{` Humble King`}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
