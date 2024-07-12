import {
  SimpleLineIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { HEADER_STYLE } from "../../styling/headers";
import { APP_COLORS } from "../../styling/color";

export default function StatsHeader({
  onReload
}) {
  const [showSearchInput, setShowSearchInput] = useState(false);
  return (
    <View style={HEADER_STYLE.container}>
      <View
        style={HEADER_STYLE.main}
      >
        <View style={HEADER_STYLE.main_left}>
        </View>
        <View
          style={[
            HEADER_STYLE.main_center,
            {
              // borderBottomWidth: 1,
              borderColor: APP_COLORS.SECONDARY_COLOR.color,
            },
          ]}
        >
          <Text style={HEADER_STYLE.label_filter}>KINZ SAS</Text>
        </View>
        <TouchableOpacity
          style={[
            HEADER_STYLE.main_right,
            {
              backgroundColor: APP_COLORS.PRIMARY_COLOR.color,
            },
          ]}
          onPress={() => onReload()}
        >
          <SimpleLineIcons name="refresh" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
