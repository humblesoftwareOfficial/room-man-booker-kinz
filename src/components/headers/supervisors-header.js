import { AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { HEADER_STYLE } from "../../styling/headers";
import { APP_COLORS } from "../../styling/color";

export default function SupervisorsListHeader({ onAdd }) {
    
  return (
    <View style={HEADER_STYLE.container}>
      <View style={HEADER_STYLE.main}>
        <View style={HEADER_STYLE.main_left}></View>
        <View
          style={[
            HEADER_STYLE.main_center,
            {
              // borderBottomWidth: 1,
              borderColor: APP_COLORS.SECONDARY_COLOR.color,
            },
          ]}
        >
          <Text style={HEADER_STYLE.label_filter}>KINZTRACK</Text>
        </View>
        <TouchableOpacity
          style={[
            HEADER_STYLE.main_right,
            {
              backgroundColor: APP_COLORS.WHITE_COLOR.color,
            },
          ]}
          onPress={() => onAdd()}
        >
          <Feather
            name="user-plus"
            size={24}
            color={APP_COLORS.PRIMARY_COLOR.color}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
