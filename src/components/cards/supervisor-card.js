import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { PROFILE_STYLE } from "../../styling/profile";
import { Feather } from "@expo/vector-icons";
import { truncateText } from "../../utils/system";
import { APP_COLORS } from "../../styling/color";

export default function SupervisorCard({ user = null, onClick }) {
  return (
    <TouchableOpacity
      style={[
        PROFILE_STYLE.top_section,
        { flexDirection: "row", justifyContent: "flex-start" },
      ]}
      onPress={() => onClick(user)}
    >
      <View style={PROFILE_STYLE.profile_image_supervisor}>
        <View style={PROFILE_STYLE.default_image}>
          <Feather name="user" size={24} color={APP_COLORS.WHITE_COLOR.color} />
        </View>
      </View>
      <View style={{ marginTop: 10, marginBottom: 15 }}>
        <Text style={PROFILE_STYLE.profile_infos_name} adjustsFontSizeToFit>
          {truncateText(`${user?.firstName} ${user?.lastName}`, 45)}
        </Text>
        {/* {user?.accountType === EAccountType.ADMIN && (
          <Text style={[PROFILE_STYLE.profile_infos_name, { color: "#000" }]}>
            ADMINISTRATEUR
          </Text>
        )} */}
        <View style={{ marginTop: 5 }}>
          <Text style={PROFILE_STYLE.profile_infos_phone} adjustsFontSizeToFits>
            {user?.phone}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
