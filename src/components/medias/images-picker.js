import { Ionicons } from "@expo/vector-icons";
import { AssetsSelector } from "expo-images-picker";
import { MediaType } from "expo-media-library";
import React, { useMemo } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { APP_COLORS } from "../../styling/color";


const ForceInset = {
  top: "never",
  bottom: "never",
};

export default function ImagesPicker({
  onClose,
  onValidate,
  alreadySelected,
  maxSelection = 6,
}) {
  const onSuccess = (data) => {
    onValidate(data);
  };

  const widgetErrors = useMemo(
    () => ({
      errorTextColor: "black",
      errorMessages: {
        hasErrorWithPermissions: "Please Allow media gallery permissions.",
        hasErrorWithLoading: "There was error while loading images.",
        hasErrorWithResizing: "There was error while loading images.",
        hasNoAssets: "No images found.",
      },
    }),
    []
  );

  const widgetSettings = useMemo(
    () => ({
      getImageMetaData: false, // true might perform slower results
      initialLoad: 100,
      assetsType: [MediaType.photo],
      minSelection: 1,
      maxSelection,
      portraitCols: 4,
      landscapeCols: 4,
    }),
    []
  );

  const widgetResize = useMemo(
    () => ({
      width: 1200,
      compress: 0.5,
      base64: true,
      saveTo: "jpeg",
    }),
    []
  );

  const _textStyle = {
    color: APP_COLORS.YELLOW_COLOR.color,
  };

  const _buttonStyle = {
    //backgroundColor: APP_COLORS.YELLOW_COLOR.color,
    borderRadius: 5,
    color: APP_COLORS.PRIMARY_COLOR.color,
  };

  const widgetNavigator = useMemo(
    () => ({
      Texts: {
        finish: "Ok",
        back: "Annuler",
        selected: "",
      },
      midTextColor: "white",
      minSelection: 1,
      buttonTextStyle: _textStyle,
      buttonStyle: _buttonStyle,
      onBack: () => {
        onClose();
      },
      onSuccess: (e) => onSuccess(e),
    }),
    []
  );

  const widgetStyles = useMemo(
    () => ({
      margin: 2,
      bgColor: "#000",
      spinnerColor: APP_COLORS.PRIMARY_COLOR.color,
      widgetWidth: 99,
      videoIcon: {
        Component: Ionicons,
        iconName: "ios-videocam",
        color: "tomato",
        size: 20,
      },
      selectedIcon: {
        Component: Ionicons,
        iconName: "ios-checkmark-circle-outline",
        color: APP_COLORS.PRIMARY_COLOR.color,
        bg: "rgba(255, 195, 0, 0.2)",
        size: 26,
      },
    }),
    []
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView forceInset={ForceInset} style={styles.container}>
        <View style={styles.container}>
          <AssetsSelector
            Settings={widgetSettings}
            Errors={widgetErrors}
            Styles={widgetStyles}
            Navigator={widgetNavigator}
            Resize={widgetResize}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
