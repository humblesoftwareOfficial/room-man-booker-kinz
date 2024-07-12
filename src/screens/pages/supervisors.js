import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SAFE_AREA_VIEW } from "../../styling/screens";
import SupervisorsListHeader from "../../components/headers/supervisors-header";
import { SCREENS_NAME } from "../../utils/system";
import SupervisorsList from "../../components/lists/supervisors-list";

export default function Supervisors({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);

  const addSupervisor = () => {
    try {
      navigation.navigate(SCREENS_NAME.NewSupervisor);
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <SafeAreaView
      style={[SAFE_AREA_VIEW.container, {}]}
      edges={["right", "left", "top"]}
    >
      <SupervisorsListHeader onAdd={addSupervisor} />
      <SupervisorsList />
    </SafeAreaView>
  );
}
