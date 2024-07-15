import {
  AntDesign,
  Entypo,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { HEADER_STYLE } from "../../styling/headers";
import { APP_COLORS } from "../../styling/color";
import UserContext from "../../config/contexts/user";
import { EAccountType } from "../../utils/system";

export default function RoomHeader({
  onNewPublication,
  onShowFilter,
  accountType = "",
  onAdd,
  onReload,
  goToRequests
}) {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const { account } = useContext(UserContext);
  return (
    <View style={HEADER_STYLE.container}>
      <View style={HEADER_STYLE.main}>
        <View style={HEADER_STYLE.main_left}></View>
        <View
          style={[
            HEADER_STYLE.main_center,
            {
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
              // backgroundColor: APP_COLORS.PRIMARY_COLOR.color,
            },
          ]}
          onPress={() => onReload()}
        >
          <MaterialCommunityIcons
            name="reload"
            size={18}
            color={APP_COLORS.PRIMARY_COLOR.color}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            HEADER_STYLE.main_right,
            {
              backgroundColor: APP_COLORS.PRIMARY_COLOR.color,
            },
          ]}
          onPress={() => goToRequests()}
        >
          <AntDesign name="addusergroup" size={18} color={APP_COLORS.WHITE_COLOR.color} />
        </TouchableOpacity>
        <TouchableOpacity
            style={[
              HEADER_STYLE.main_right,
              {
                // backgroundColor: APP_COLORS.SECONDARY_COLOR.color,
              },
            ]}
            onPress={() => onShowFilter()}
          >
            <Ionicons
              name="filter"
              size={18}
              color={APP_COLORS.ORANGE_COLOR.color}
            />
          </TouchableOpacity>
        {account?.accountType === EAccountType.ADMIN && (
          <TouchableOpacity
            style={[
              HEADER_STYLE.main_right,
              {
                backgroundColor: APP_COLORS.YELLOW_COLOR.color,
              },
            ]}
            onPress={() => onAdd()}
          >
            <Entypo
              name="plus"
              size={18}
              color={APP_COLORS.BLACK_COLOR.color}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
