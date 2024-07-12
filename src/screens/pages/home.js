import React, { useContext } from "react";
import { Platform } from "react-native";
import { Feather, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import { EAccountType, VIEWS_NAME } from "../../utils/system";
import { APP_COLORS } from "../../styling/color";
import Rooms from "./rooms";
import Profile from "./profile";
import Stats from "./stats";
import UserContext from "../../config/contexts/user";

const Tabs = AnimatedTabBarNavigator();

export default ({ initialRouteName = VIEWS_NAME.Rooms }) => {
  const { account } = useContext(UserContext);

  return (
    <Tabs.Navigator
      initialRouteName={initialRouteName}
      tabBarOptions={{
        activeBackgroundColor: APP_COLORS.PRIMARY_COLOR.color,
        activeTintColor: APP_COLORS.WHITE_COLOR.color,
        inactiveTintColor: APP_COLORS.BLACK_COLOR.color,
        showLabel: true,
        tabStyle: {
          backgroundColor: APP_COLORS.WHITE_COLOR.color,
          borderColor: APP_COLORS.TERTIARY_COLOR.color,
          // borderTopWidth: 1,
          elevation: 1,
        },
        style: {
          position: "absolute",
        },
        tabBarHideOnKeyboard: true,
      }}
      appearance={{
        topPadding: 7,
        horizontalPadding: 10,
        whenInactiveShow: "label-only",
        bottomPadding: Platform.OS === "ios" && Platform.Version >= 17 ? 20 : 2,
      }}
    >
      <Tabs.Screen
        name={VIEWS_NAME.Rooms}
        component={Rooms}
        options={{
          tabBarLabel: "Rooms",
          tabBarIcon: ({ color, size, focused }) => (
            <Octicons
              name="home"
              size={size - 3}
              color={focused ? color : APP_COLORS.SECONDARY_COLOR.color}
            />
          ),
        }}
      />
      {/* {account?.accountType === EAccountType.ADMIN && ( */}
        <Tabs.Screen
          name={VIEWS_NAME.Stats}
          component={Stats}
          options={{
            tabBarLabel: "Stats.",
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons
                name="finance"
                size={size - 3}
                color={focused ? color : APP_COLORS.SECONDARY_COLOR.color}
              />
            ),
          }}
        />
      {/* // )} */}
      <Tabs.Screen
        name={VIEWS_NAME.Profile}
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="user"
              size={size}
              color={focused ? color : APP_COLORS.SECONDARY_COLOR.color}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
