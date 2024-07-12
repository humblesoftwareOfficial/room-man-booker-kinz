import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { Image, LogBox, Platform, StyleSheet, Text, View } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";
import { loadAsync, useFonts } from "expo-font";
import { CalendarList, LocaleConfig } from "react-native-calendars";
import { Asset } from "expo-asset";
import { APP_COLORS } from "./src/styling/color";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Provider as PaperProvider } from "react-native-paper";
import { RootSiblingParent } from "react-native-root-siblings";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import Welcome from "./src/screens/defaults/welcome";
import Navigation from "./src/screens/navigation";
import UserProvider from "./src/config/contexts/userprovider";
import NewRoomProvider from "./src/config/contexts/new-room-provider";
import NewReservationProvider from "./src/config/contexts/new-reservation-provider";
import { registerForPushNotificationsAsync } from "./src/utils/token";

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map((font) => loadAsync(font));
}

LogBox.ignoreLogs([
  "Warning: BottomTabNavigator: Support for defaultProps will be removed from function components in a future major release.",
]);

LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = "fr";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    priority: Notifications.AndroidNotificationPriority.MAX,
  }),
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    avenirBold: require("./src/assets/fonts/AvenirNextLTPro-Bold.otf"),
    avenir: require("./src/assets/fonts/AvenirNextLTPro-Regular.otf"),
    alexBrush: require("./src/assets/fonts/AlexBrush-Regular.ttf"),
    grapeNuts: require("./src/assets/fonts/GrapeNuts-Regular.ttf"),
    belleAurore: require("./src/assets/fonts/LaBelleAurore-Regular.ttf"),
    sacramento: require("./src/assets/fonts/Sacramento-Regular.ttf"),
    yesteryear: require("./src/assets/fonts/Yesteryear-Regular.ttf"),
    snigletRegular: require("./src/assets/fonts/Sniglet-Regular.ttf"),
    snigletBold: require("./src/assets/fonts/Sniglet-ExtraBold.ttf"),
    pacificoRegular: require("./src/assets/fonts/Pacifico-Regular.ttf"),
    righteousRegular: require("./src/assets/fonts/Righteous-Regular.ttf"),
    lasAmerica: require("./src/assets/fonts/LasAmerica.otf"),
    championShip: require("./src/assets/fonts/Championship.ttf"),
  });
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    async function prepare() {
      try {
        await _loadAssetsAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        //console.log(response);
      });

    //schedulePushNotification();

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      // require("./assets/stylup.png"),
      // require("./src/assets/images/empty_fun.png"),
      // require("./src/assets/images/empty_fun.png"),
      // require("./src/assets/images/empty.png"),
      // require("./src/assets/images/empty.png"),
      // require("./src/assets/images/no_favorites.png"),
      // "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
      // require("./assets/images/circle.jpg"),
    ]);

    try {
      SplashScreen.preventAutoHideAsync();
      const fontAssets = cacheFonts([FontAwesome.font]);
      await Promise.all([...imageAssets, ...fontAssets]);
    } catch (e) {
      console.warn(e);
    } finally {
      SplashScreen.hideAsync();
    }

    const fontAssets = cacheFonts([
      FontAwesome.font,
      AntDesign.font,
      Entypo.font,
      EvilIcons.font,
      Feather.font,
      Fontisto.font,
      Ionicons.font,
      MaterialCommunityIcons.font,
      MaterialIcons.font,
      SimpleLineIcons.font,
    ]);

    await Promise.all([...imageAssets, ...fontAssets]);
  };

  if (Platform.OS === "android")
    NavigationBar.setBackgroundColorAsync(APP_COLORS.PRIMARY_COLOR.color);

  return (
    <PaperProvider>
      <RootSiblingParent>
        <UserProvider>
          <NewRoomProvider>
            <NewReservationProvider>
              <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                {fontsLoaded && appIsReady ? <Navigation /> : <Welcome />}
              </SafeAreaProvider>
            </NewReservationProvider>
          </NewRoomProvider>
        </UserProvider>
      </RootSiblingParent>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
