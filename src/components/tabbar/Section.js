import { View } from "react-native";
import React from "react";

import RoomsList from "../lists/rooms-list";

export default function Section({
  section,
  navigation,
  filterCategories = [],
}) {
  return (
    <View style={{ flex: 1 }}>
      <RoomsList navigation={navigation} house={section}/>
    </View>
  );
}
