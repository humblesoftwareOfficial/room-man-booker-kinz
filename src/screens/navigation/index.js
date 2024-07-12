import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useContext, useEffect, useState } from "react";
import { SCREENS_NAME } from "../../utils/system";
import { default as Home } from "../pages/home";
import RoomDetails from "../pages/room-details";

import UserContext from "../../config/contexts/user";
import { AddItemToStorage, GetItemToStorage } from "../../utils/local-database";
import Login from "../pages/authentication";
import FullLoadingContainer from "../../components/loaders/full-loading";
import NewHouse from "../pages/houses/new-house";
import NewRoom from "../pages/new-room";
import NewReservation from "../pages/new-reservation";
import NewSupervisor from "../pages/new-supervisor";
import Supervisors from "../pages/supervisors";
import NewRequestReservation from "../pages/request-reservation";
import RoomCurrentReservationDetails from "../pages/reservation-details";
import ReservationsRequests from "../pages/request-reservation/requests";
import ExtendReservation from "../pages/extend-reservation";
import Analytics from "../pages/analytics";


const Stack = createStackNavigator();
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFF",
  },
};

export default function Navigation() {
  const [isConnected, setIsConnected] = useState(false);
  const { account, setAccount, isAuthenticated, setIsAuthenticated } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAccessToken();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const getAccessToken = async () => {
    try {
      const access_token = await GetItemToStorage("_access_token");
      if (access_token) {
        const code = await GetItemToStorage("_code");
        const phone = await GetItemToStorage("_phone");
        const profile_picture = await GetItemToStorage("_pp");
        const profile_picture_key = await GetItemToStorage("_ppkey");
        const firstName = await GetItemToStorage("_firstName");
        const lastName = await GetItemToStorage("_lastName");
        const accountType = await GetItemToStorage("_account_type");
        const address = await GetItemToStorage("_address");
        const company_code = await GetItemToStorage(
          "_company_code"
        );
        const company_name = await GetItemToStorage(
          "_company_name"
        );
        const company_description = await GetItemToStorage(
          "_company_description"
        );

        const house_code = await GetItemToStorage(
          "_house_code"
        );
        const house_name = await GetItemToStorage(
          "_house_name"
        );
        const house_description = await GetItemToStorage(
          "_house_description"
        );

        setAccount({
          firstName,
          lastName,
          profile_picture,
          profile_picture_key,
          access_token,
          phone,
          code,
          accountType,
          address,
          company: {
            code: company_code,
            name: company_name,
            description: company_description,
          },
          house: {
            code: house_code,
            name: house_name,
            description: house_description,
          },
          isAuthenticated: true,
        });
        setIsAuthenticated(true);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
    }
  };

  return (
    <NavigationContainer theme={navTheme}>
      {isLoading ? (
        <FullLoadingContainer text="" />
      ) : (
        <Stack.Navigator>
          {isAuthenticated === true ? (
            <>
              <Stack.Screen
                name={SCREENS_NAME.Home}
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={SCREENS_NAME.RoomDetails}
                component={RoomDetails}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={SCREENS_NAME.NewReservation}
                component={NewReservation}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={SCREENS_NAME.NewHouse}
                component={NewHouse}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={SCREENS_NAME.NewRoom}
                component={NewRoom}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={SCREENS_NAME.NewSupervisor}
                component={NewSupervisor}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={SCREENS_NAME.Supervisors}
                component={Supervisors}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={SCREENS_NAME.RequestReservation}
                component={NewRequestReservation}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={SCREENS_NAME.RoomCurrentReservationDetails}
                component={RoomCurrentReservationDetails}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={SCREENS_NAME.ReservationsRequests}
                component={ReservationsRequests}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={SCREENS_NAME.ExtendReservation}
                component={ExtendReservation}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={SCREENS_NAME.Analytics}
                component={Analytics}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <Stack.Screen
              name={SCREENS_NAME.Login}
              component={Login}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
